import { Wallet } from "@coral-xyz/anchor";
import { Connection, Keypair, Transaction, TransactionSignature } from "@solana/web3.js";
import { IDL, OracleIDL } from "./oracleIDL";
import { BN } from "bn.js";


export function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export async function signTransactionsWithWallet(
    connection: Connection,
    wallet: Wallet,
    transactionsData: {
        transaction: Transaction,
        signers: Keypair[],
    }[]
): Promise<Transaction[]> {
    if (transactionsData.length == 0) return [];
    let { blockhash } = await connection.getLatestBlockhash("processed");
    for (let i = 0; i < transactionsData.length; i++) {
        transactionsData[i].transaction.feePayer = wallet.publicKey;
        transactionsData[i].transaction.recentBlockhash = blockhash;
        if (transactionsData[i].signers.length > 0)
            transactionsData[i].transaction.partialSign(
                ...transactionsData[i].signers
            );
    }

    return await wallet.signAllTransactions(
        transactionsData.map(data => data.transaction)
    ).catch((e) => { throw new Error("failed")});
}

export async function sendSignedTransaction(
    connection: Connection,
    transaction: Transaction,
    retries: number = 5,
    delayMs: number = 400,
): Promise<TransactionSignature> {
    let serialized = transaction.serialize();
    let txId = null;
    txId = await connection.sendRawTransaction(
        serialized, {skipPreflight:true, preflightCommitment: "confirmed"},
    ).catch((e) => { throw new Error("Couldn't send transaction: "  + e.message) });
    let time = Date.now();
    for (let numDelay = 0; numDelay < retries; numDelay++)
        delay(delayMs * numDelay).then(() => {
            connection.
            sendRawTransaction(serialized, {skipPreflight: true, preflightCommitment: "confirmed"}).catch(() => {});
        })
    return txId;
}

export async function confirmTransaction(
    connection: Connection,
    txId: TransactionSignature,
    timeout: number = 30,
): Promise<boolean> {
    let result = undefined;
    for (let _ = 0; _ < timeout && result == undefined; _++) {
        await connection
            .getTransaction(txId, {commitment: "confirmed"})
            .catch((e) => { throw new Error("Couldn't confirm transaction"); })
            .then(response => {
                if (!response)
                    return;
                if (response.meta && response.meta.err)
                    result = false;
                else
                    result = true;
            })
    }
    if (result == undefined)
        return false;
    return result;
}

export async function sendSignedTransactions(
    connection: Connection,
    transactions: Transaction[],
    confirmFirstN: number = 0,
): Promise<TransactionSignature[]> {
    let txs: TransactionSignature[] = [];

    for (let i = 0; i < confirmFirstN; i++) {
        let txId = await sendSignedTransaction(connection, transactions[i]);
        let result = await confirmTransaction(connection, txId);
        if (result)
            txs.push(txId);
        else
            throw new Error("Transaction failed.");
    }
    
    let remainingTxs = await Promise.all(
        transactions
            .slice(confirmFirstN, transactions.length)
            .map(transaction => sendSignedTransaction(connection, transaction))
    );

    await Promise.all(remainingTxs.map(tx => confirmTransaction(connection, tx))).catch(() => {});
    
    return [...txs, ...remainingTxs];
}

export function getWhirlpoolPrice(whirlpool: any) {
    let price = new BN(whirlpool.account.sqrtPrice).mul(new BN(whirlpool.account.sqrtPrice))
                    .div(new BN("18446744073709551616")).div(new BN("18446744073709551616"));
    return Number(price.div(new BN("1000000")).toString());
}

export function getClmmPrice(clmm: any) {
    let price = new BN(clmm.account.sqrtPriceX64).mul(new BN(clmm.account.sqrtPriceX64))
                    .div(new BN("18446744073709551616")).div(new BN("18446744073709551616"));
    return Number(price.div(new BN("1000000")).toString());
}