import { PublicKey } from "@solana/web3.js";

export enum Protocol {
    WHIRLPOOL,
    RAYDIUM_CLMM,
    METEORA_DLMM,
}

export interface OracleConfig {
    configAccount: PublicKey,
    creator: PublicKey,
    tokenMint: PublicKey,
    numOfPools: number,
    protocolList: number[],
    poolDataList: PoolData[],
}

export interface PoolData {
    poolAccount: PublicKey,
    numOfDependencies: number,
    poolDependencies: PublicKey[],
}

export interface Oracle {

}