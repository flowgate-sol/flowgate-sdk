import { Account, AccountInfo, Connection, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmRawTransaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { OracleConfig } from "./interfaces";
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import { IDL, OracleIDL } from "./oracleIDL";
import * as anchor from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { FLOWGATE_ORACLE_PROGRAM } from "./consts";
import { getClmmPrice, getWhirlpoolPrice, sendSignedTransaction, sendSignedTransactions, signTransactionsWithWallet } from "./utils";
import { BN } from "bn.js";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";


export class FlowgateSDK {
    public connection: Connection;
    public program: Program<IDL>;
    public oracleConfigs: OracleConfig[];
    private wallet?: Wallet | Keypair;

    constructor(connection: Connection, oracleProgram: Program<IDL>, wallet?: Wallet | Keypair) {
        this.connection = connection;
        this.program = oracleProgram;
        this.oracleConfigs = [];
        this.wallet = wallet;
    }

    static init(providerUrl: string, wallet?: Wallet | Keypair) {
        const connection = new Connection(providerUrl);
        const provider = new AnchorProvider(
            connection,
            wallet as Wallet,
            { skipPreflight: true, preflightCommitment: "confirmed"}
        );
        const flowgateProgram = new Program(OracleIDL, FLOWGATE_ORACLE_PROGRAM, provider);
        
        return new FlowgateSDK(connection, flowgateProgram, wallet);
    }

    public async update() {
        let oracleAccounts = await this.program.account.config.all();
        this.oracleConfigs = [];
        for(let oracleAccount of oracleAccounts) {
            let oracleConfig: any = {};
            oracleConfig.creator = oracleAccount.account.creator;
            oracleConfig.configAccount = oracleAccount.publicKey;
            oracleConfig.numOfPools = oracleAccount.account.numOfPools;
            oracleConfig.protocolList = oracleAccount.account.protocolList;
            oracleConfig.poolDataList = oracleAccount.account.poolDataList;
            oracleConfig.tokenMint = oracleAccount.account.tokenMint;
            this.oracleConfigs.push(oracleConfig);
            console.log(oracleAccount.publicKey.toBase58(), oracleConfig.poolDataList[0].poolAccount.toBase58(), oracleConfig.poolDataList[1].poolAccount.toBase58());
            // console.log("POOLACCOUNTS: ", oracleConfig.poolDataList);
        }
    }

    public async simulatePriceData() {
        let [clmms, whirls] = await Promise.all([
            this.program.account.poolState.all(),
            this.program.account.whirlpool.all()
        ]);
        let result: {
            token: PublicKey,
            price: number,
        }[] = [];
        for(let oracleConfig of this.oracleConfigs) {
            let price = 0;
            for(let i=0; i<oracleConfig.numOfPools; i++){
                let protocol = oracleConfig.protocolList[i];
                let poolAccount = oracleConfig.poolDataList[i];
                // protocol=0 -> whirlpool, protocol=1 -> raydium clmm
                if(protocol == 0) {
                    let whirl: any = whirls.find((whirlAccount: any) => whirlAccount.publicKey.toBase58() == poolAccount.poolAccount.toBase58());
                    console.log(whirl.publicKey.toBase58());
                    let currPrice = getWhirlpoolPrice(whirl);
                    console.log(currPrice);
                    price += currPrice;
                }
                if(protocol == 1) {
                    let clmm: any = clmms.find((clmmAccount: any) => clmmAccount.publicKey.toBase58() == poolAccount.poolAccount.toBase58());
                    console.log(clmm.publicKey.toBase58());
                    let currPrice = getClmmPrice(clmm);
                    console.log(currPrice);
                    price += currPrice;
                }
            }
            // console.log(oracleConfig);
            result.push({
                token: oracleConfig.tokenMint,
                price: price / oracleConfig.numOfPools
            });
        }
        return result;
    }

    public async initializeConfig(
        config: OracleConfig
    ) {
        if(!this.wallet)return;
        let configAccount = Keypair.generate();
        let createConfigTx = new Transaction();

        createConfigTx.add(
            await this.program.account.config.createInstruction(configAccount)
        );
        while(config.protocolList.length < 10) {
            config.protocolList.push(0);
        }

        let numOfDependencies = [];
        for(let poolData of config.poolDataList){
            numOfDependencies.push(poolData.numOfDependencies);
        }

        while(numOfDependencies.length < 10) {
            numOfDependencies.push(0);
        }

        let remainingAccounts: {
            pubkey: PublicKey,
            isSigner: boolean,
            isWritable: boolean
        }[] = [];

        for(let poolData of config.poolDataList) {
            remainingAccounts.push({
                pubkey: poolData.poolAccount,
                isWritable: false,
                isSigner: false
            });
            for(let dependency of poolData.poolDependencies) {
                remainingAccounts.push({
                    pubkey: dependency,
                    isSigner: false,
                    isWritable: false
                });
            }
        }

        createConfigTx.add(
            await this.program.methods.initializeConfig(
                config.numOfPools,
                config.protocolList,
                numOfDependencies
            ).accounts({
                creator: this.wallet.publicKey,
                config: configAccount.publicKey,
                tokenMint: config.tokenMint,
                systemProgram: SystemProgram.programId,
                tokenProgram: new PublicKey(TOKEN_PROGRAM_ID)
            }).remainingAccounts(remainingAccounts).instruction()
        );

        let [signedTxs] = await signTransactionsWithWallet(
            this.connection, 
            this.wallet as Wallet,
            [{transaction: createConfigTx, signers: [configAccount]}]
        );


        return await sendSignedTransaction(this.connection, signedTxs, 1);
    }

    public async getPrice(
        configAccount: PublicKey,
        config: OracleConfig,
    ) {

        if(!this.wallet)return;
        let remainingAccounts: {
            pubkey: PublicKey,
            isSigner: boolean,
            isWritable: boolean
        }[] = [];

        for(let poolData of config.poolDataList) {
            remainingAccounts.push({
                pubkey: poolData.poolAccount,
                isWritable: false,
                isSigner: false
            });
            for(let dependency of poolData.poolDependencies) {
                remainingAccounts.push({
                    pubkey: dependency,
                    isSigner: false,
                    isWritable: false
                });
            }
        }
        return await this.program.methods.getPrice().accounts({
            config: configAccount
        }).remainingAccounts(remainingAccounts).rpc();
    }

    public async simulateRaydiumAndOrcaPools(
        token_0: PublicKey,
        token_1: PublicKey,
    ) {

        if(!this.wallet)return;
        let createPoolsTx = new Transaction();

        let whirl = Keypair.generate();
        let ray = Keypair.generate();

        console.log("whirl: ", whirl.publicKey.toBase58());
        console.log("ray: ", ray.publicKey.toBase58());

        createPoolsTx.add(
            await this.program.account.poolState.createInstruction(ray)
        );
        createPoolsTx.add(
            await this.program.account.whirlpool.createInstruction(whirl)
        );

        createPoolsTx.add(await this.program.methods.createRaydiumClmmAndWhirlpool().accounts({
            signer: this.wallet.publicKey,
            clmmAccount: ray.publicKey,
            whirlpoolAccount: whirl.publicKey,
            tokenMint0: token_0,
            tokenMint1: token_1,
            systemProgram: SystemProgram.programId,
        }).instruction());
        let [signedTxs] = await signTransactionsWithWallet(
            this.connection, 
            this.wallet as Wallet,
            [{transaction: createPoolsTx, signers: [ray, whirl]}]
        );


        await sendSignedTransaction(this.connection, signedTxs, 1);
        return [whirl.publicKey, ray.publicKey];
    }

    public async simulatePrice(
        ray: PublicKey,
        whirl: PublicKey,
        rayPrice: number,
        whirlPrice: number,
    ) {
        if(!this.wallet)return;
        let simulatePriceTx = new Transaction();
        let rayP = Math.floor(Math.sqrt(rayPrice * 1000000000));
        let whirlP = Math.floor(Math.sqrt(whirlPrice * 1000000000));
        console.log(ray.toBase58(), rayP);
        console.log(whirl.toBase58(), whirlP);
        simulatePriceTx.add(await this.program.methods.simulatePriceInClmmAndWhirlpool(
            new BN(rayP).mul(new BN("18446744073709551616")).mul(new BN(100)),
            new BN(whirlP).mul(new BN("18446744073709551616")).mul(new BN(100)),
        ).accounts({
            signer: this.wallet.publicKey,
            raydiumClmm: ray,
            whirlpool: whirl,
            systemProgram: SystemProgram.programId,
        }).instruction());

        let [signedTxs] = await signTransactionsWithWallet(
            this.connection, 
            this.wallet as Wallet,
            [{transaction: simulatePriceTx, signers: []}]
        );


        return await sendSignedTransaction(this.connection, signedTxs, 1);
    }

    public async closeConfigAccount(
        configAccount: PublicKey
    ) {

        if(!this.wallet)return;
        return await this.program.methods.closeAccount().accounts({
            signer: this.wallet.publicKey,
            config: configAccount,
            system: SystemProgram.programId,
        }).rpc();
    }

    public async createPriceContainer() {
        let createPriceContainer = new Transaction();
        let priceContainer = Keypair.generate();
        createPriceContainer.add(
            await this.program.account.priceContainer.createInstruction(priceContainer)
        );

        createPriceContainer.add(
            await this.program.methods.createPriceContainer().accounts({
                priceContainer: priceContainer.publicKey
            }).instruction()
        );

        let [signedTxs] = await signTransactionsWithWallet(
            this.connection, 
            this.wallet as Wallet,
            [{transaction: createPriceContainer, signers: [priceContainer]}]
        );


        return await sendSignedTransaction(this.connection, signedTxs, 1);
    }
}