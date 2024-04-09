export type IDL = {
    "version": "0.1.0",
    "name": "oracle",
    "instructions": [
      {
        "name": "initializeConfig",
        "accounts": [
          {
            "name": "creator",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "config",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "numOfPools",
            "type": "u8"
          },
          {
            "name": "protocolList",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          },
          {
            "name": "numOfDependencies",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          }
        ]
      },
      {
        "name": "getPrice",
        "accounts": [
          {
            "name": "config",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "createRaydiumClmmAndWhirlpool",
        "accounts": [
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "clmmAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "whirlpoolAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenMint0",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenMint1",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "simulatePriceInClmmAndWhirlpool",
        "accounts": [
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "raydiumClmm",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "whirlpool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "priceClmm",
            "type": "u128"
          },
          {
            "name": "priceWhirlpool",
            "type": "u128"
          }
        ]
      },
      {
        "name": "createPriceContainer",
        "accounts": [
          {
            "name": "priceContainer",
            "isMut": true,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "closeAccount",
        "accounts": [
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "config",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "system",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      }
    ],
    "accounts": [
      {
        "name": "poolState",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "bump",
              "docs": [
                "Bump to identify PDA"
              ],
              "type": {
                "array": [
                  "u8",
                  1
                ]
              }
            },
            {
              "name": "ammConfig",
              "type": "publicKey"
            },
            {
              "name": "owner",
              "type": "publicKey"
            },
            {
              "name": "tokenMint0",
              "docs": [
                "Token pair of the pool, where token_mint_0 address < token_mint_1 address"
              ],
              "type": "publicKey"
            },
            {
              "name": "tokenMint1",
              "type": "publicKey"
            },
            {
              "name": "tokenVault0",
              "docs": [
                "Token pair vault"
              ],
              "type": "publicKey"
            },
            {
              "name": "tokenVault1",
              "type": "publicKey"
            },
            {
              "name": "observationKey",
              "docs": [
                "observation account key"
              ],
              "type": "publicKey"
            },
            {
              "name": "mintDecimals0",
              "docs": [
                "mint0 and mint1 decimals"
              ],
              "type": "u8"
            },
            {
              "name": "mintDecimals1",
              "type": "u8"
            },
            {
              "name": "tickSpacing",
              "docs": [
                "The minimum number of ticks between initialized ticks"
              ],
              "type": "u16"
            },
            {
              "name": "liquidity",
              "docs": [
                "The currently in range liquidity available to the pool."
              ],
              "type": "u128"
            },
            {
              "name": "sqrtPriceX64",
              "docs": [
                "The current price of the pool as a sqrt(token_1/token_0) Q64.64 value"
              ],
              "type": "u128"
            },
            {
              "name": "tickCurrent",
              "docs": [
                "The current tick of the pool, i.e. according to the last tick transition that was run."
              ],
              "type": "i32"
            },
            {
              "name": "observationIndex",
              "docs": [
                "the most-recently updated index of the observations array"
              ],
              "type": "u16"
            },
            {
              "name": "observationUpdateDuration",
              "type": "u16"
            },
            {
              "name": "feeGrowthGlobal0X64",
              "docs": [
                "The fee growth as a Q64.64 number, i.e. fees of token_0 and token_1 collected per",
                "unit of liquidity for the entire life of the pool."
              ],
              "type": "u128"
            },
            {
              "name": "feeGrowthGlobal1X64",
              "type": "u128"
            },
            {
              "name": "protocolFeesToken0",
              "docs": [
                "The amounts of token_0 and token_1 that are owed to the protocol."
              ],
              "type": "u64"
            },
            {
              "name": "protocolFeesToken1",
              "type": "u64"
            },
            {
              "name": "swapInAmountToken0",
              "docs": [
                "The amounts in and out of swap token_0 and token_1"
              ],
              "type": "u128"
            },
            {
              "name": "swapOutAmountToken1",
              "type": "u128"
            },
            {
              "name": "swapInAmountToken1",
              "type": "u128"
            },
            {
              "name": "swapOutAmountToken0",
              "type": "u128"
            },
            {
              "name": "status",
              "docs": [
                "Bitwise representation of the state of the pool",
                "bit0, 1: disable open position and increase liquidity, 0: normal",
                "bit1, 1: disable decrease liquidity, 0: normal",
                "bit2, 1: disable collect fee, 0: normal",
                "bit3, 1: disable collect reward, 0: normal",
                "bit4, 1: disable swap, 0: normal"
              ],
              "type": "u8"
            },
            {
              "name": "padding",
              "docs": [
                "Leave blank for future use"
              ],
              "type": {
                "array": [
                  "u8",
                  7
                ]
              }
            },
            {
              "name": "rewardInfos",
              "type": {
                "array": [
                  {
                    "defined": "RewardInfo"
                  },
                  3
                ]
              }
            },
            {
              "name": "tickArrayBitmap",
              "docs": [
                "Packed initialized tick array state"
              ],
              "type": {
                "array": [
                  "u64",
                  16
                ]
              }
            },
            {
              "name": "totalFeesToken0",
              "docs": [
                "except protocol_fee and fund_fee"
              ],
              "type": "u64"
            },
            {
              "name": "totalFeesClaimedToken0",
              "docs": [
                "except protocol_fee and fund_fee"
              ],
              "type": "u64"
            },
            {
              "name": "totalFeesToken1",
              "type": "u64"
            },
            {
              "name": "totalFeesClaimedToken1",
              "type": "u64"
            },
            {
              "name": "fundFeesToken0",
              "type": "u64"
            },
            {
              "name": "fundFeesToken1",
              "type": "u64"
            },
            {
              "name": "openTime",
              "type": "u64"
            },
            {
              "name": "padding1",
              "type": {
                "array": [
                  "u64",
                  25
                ]
              }
            },
            {
              "name": "padding2",
              "type": {
                "array": [
                  "u64",
                  32
                ]
              }
            }
          ]
        }
      },
      {
        "name": "whirlpool",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "whirlpoolsConfig",
              "type": "publicKey"
            },
            {
              "name": "whirlpoolBump",
              "type": {
                "array": [
                  "u8",
                  1
                ]
              }
            },
            {
              "name": "tickSpacing",
              "type": "u16"
            },
            {
              "name": "tickSpacingSeed",
              "type": {
                "array": [
                  "u8",
                  2
                ]
              }
            },
            {
              "name": "feeRate",
              "type": "u16"
            },
            {
              "name": "protocolFeeRate",
              "type": "u16"
            },
            {
              "name": "liquidity",
              "type": "u128"
            },
            {
              "name": "sqrtPrice",
              "type": "u128"
            },
            {
              "name": "tickCurrentIndex",
              "type": "i32"
            },
            {
              "name": "protocolFeeOwedA",
              "type": "u64"
            },
            {
              "name": "protocolFeeOwedB",
              "type": "u64"
            },
            {
              "name": "tokenMintA",
              "type": "publicKey"
            },
            {
              "name": "tokenVaultA",
              "type": "publicKey"
            },
            {
              "name": "feeGrowthGlobalA",
              "type": "u128"
            },
            {
              "name": "tokenMintB",
              "type": "publicKey"
            },
            {
              "name": "tokenVaultB",
              "type": "publicKey"
            },
            {
              "name": "feeGrowthGlobalB",
              "type": "u128"
            },
            {
              "name": "rewardLastUpdatedTimestamp",
              "type": "u64"
            },
            {
              "name": "rewardInfos",
              "type": {
                "array": [
                  {
                    "defined": "WhirlpoolRewardInfo"
                  },
                  3
                ]
              }
            }
          ]
        }
      },
      {
        "name": "config",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "creator",
              "type": "publicKey"
            },
            {
              "name": "tokenMint",
              "type": "publicKey"
            },
            {
              "name": "numOfPools",
              "type": "u8"
            },
            {
              "name": "protocolList",
              "type": {
                "array": [
                  "u8",
                  10
                ]
              }
            },
            {
              "name": "poolDataList",
              "type": {
                "array": [
                  {
                    "defined": "PoolData"
                  },
                  10
                ]
              }
            }
          ]
        }
      },
      {
        "name": "priceContainer",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "price",
              "type": "u128"
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "RewardInfo",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "rewardState",
              "docs": [
                "Reward state"
              ],
              "type": "u8"
            },
            {
              "name": "openTime",
              "docs": [
                "Reward open time"
              ],
              "type": "u64"
            },
            {
              "name": "endTime",
              "docs": [
                "Reward end time"
              ],
              "type": "u64"
            },
            {
              "name": "lastUpdateTime",
              "docs": [
                "Reward last update time"
              ],
              "type": "u64"
            },
            {
              "name": "emissionsPerSecondX64",
              "docs": [
                "Q64.64 number indicates how many tokens per second are earned per unit of liquidity."
              ],
              "type": "u128"
            },
            {
              "name": "rewardTotalEmissioned",
              "docs": [
                "The total amount of reward emissioned"
              ],
              "type": "u64"
            },
            {
              "name": "rewardClaimed",
              "docs": [
                "The total amount of claimed reward"
              ],
              "type": "u64"
            },
            {
              "name": "tokenMint",
              "docs": [
                "Reward token mint."
              ],
              "type": "publicKey"
            },
            {
              "name": "tokenVault",
              "docs": [
                "Reward vault token account."
              ],
              "type": "publicKey"
            },
            {
              "name": "authority",
              "docs": [
                "The owner that has permission to set reward param"
              ],
              "type": "publicKey"
            },
            {
              "name": "rewardGrowthGlobalX64",
              "docs": [
                "Q64.64 number that tracks the total tokens earned per unit of liquidity since the reward",
                "emissions were turned on."
              ],
              "type": "u128"
            }
          ]
        }
      },
      {
        "name": "WhirlpoolRewardInfo",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "mint",
              "docs": [
                "Reward token mint."
              ],
              "type": "publicKey"
            },
            {
              "name": "vault",
              "docs": [
                "Reward vault token account."
              ],
              "type": "publicKey"
            },
            {
              "name": "authority",
              "docs": [
                "Authority account that has permission to initialize the reward and set emissions."
              ],
              "type": "publicKey"
            },
            {
              "name": "emissionsPerSecondX64",
              "docs": [
                "Q64.64 number that indicates how many tokens per second are earned per unit of liquidity."
              ],
              "type": "u128"
            },
            {
              "name": "growthGlobalX64",
              "docs": [
                "Q64.64 number that tracks the total tokens earned per unit of liquidity since the reward",
                "emissions were turned on."
              ],
              "type": "u128"
            }
          ]
        }
      },
      {
        "name": "PoolData",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolAccount",
              "type": "publicKey"
            },
            {
              "name": "numOfDependencies",
              "type": "u8"
            },
            {
              "name": "poolDependencies",
              "type": {
                "array": [
                  "publicKey",
                  5
                ]
              }
            }
          ]
        }
      }
    ]
  };
  
  export const OracleIDL: IDL = {
    "version": "0.1.0",
    "name": "oracle",
    "instructions": [
      {
        "name": "initializeConfig",
        "accounts": [
          {
            "name": "creator",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "config",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "numOfPools",
            "type": "u8"
          },
          {
            "name": "protocolList",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          },
          {
            "name": "numOfDependencies",
            "type": {
              "array": [
                "u8",
                10
              ]
            }
          }
        ]
      },
      {
        "name": "getPrice",
        "accounts": [
          {
            "name": "config",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "createRaydiumClmmAndWhirlpool",
        "accounts": [
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "clmmAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "whirlpoolAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenMint0",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenMint1",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "simulatePriceInClmmAndWhirlpool",
        "accounts": [
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "raydiumClmm",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "whirlpool",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "priceClmm",
            "type": "u128"
          },
          {
            "name": "priceWhirlpool",
            "type": "u128"
          }
        ]
      },
      {
        "name": "createPriceContainer",
        "accounts": [
          {
            "name": "priceContainer",
            "isMut": true,
            "isSigner": false
          }
        ],
        "args": []
      },
      {
        "name": "closeAccount",
        "accounts": [
          {
            "name": "signer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "config",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "system",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": []
      }
    ],
    "accounts": [
      {
        "name": "poolState",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "bump",
              "docs": [
                "Bump to identify PDA"
              ],
              "type": {
                "array": [
                  "u8",
                  1
                ]
              }
            },
            {
              "name": "ammConfig",
              "type": "publicKey"
            },
            {
              "name": "owner",
              "type": "publicKey"
            },
            {
              "name": "tokenMint0",
              "docs": [
                "Token pair of the pool, where token_mint_0 address < token_mint_1 address"
              ],
              "type": "publicKey"
            },
            {
              "name": "tokenMint1",
              "type": "publicKey"
            },
            {
              "name": "tokenVault0",
              "docs": [
                "Token pair vault"
              ],
              "type": "publicKey"
            },
            {
              "name": "tokenVault1",
              "type": "publicKey"
            },
            {
              "name": "observationKey",
              "docs": [
                "observation account key"
              ],
              "type": "publicKey"
            },
            {
              "name": "mintDecimals0",
              "docs": [
                "mint0 and mint1 decimals"
              ],
              "type": "u8"
            },
            {
              "name": "mintDecimals1",
              "type": "u8"
            },
            {
              "name": "tickSpacing",
              "docs": [
                "The minimum number of ticks between initialized ticks"
              ],
              "type": "u16"
            },
            {
              "name": "liquidity",
              "docs": [
                "The currently in range liquidity available to the pool."
              ],
              "type": "u128"
            },
            {
              "name": "sqrtPriceX64",
              "docs": [
                "The current price of the pool as a sqrt(token_1/token_0) Q64.64 value"
              ],
              "type": "u128"
            },
            {
              "name": "tickCurrent",
              "docs": [
                "The current tick of the pool, i.e. according to the last tick transition that was run."
              ],
              "type": "i32"
            },
            {
              "name": "observationIndex",
              "docs": [
                "the most-recently updated index of the observations array"
              ],
              "type": "u16"
            },
            {
              "name": "observationUpdateDuration",
              "type": "u16"
            },
            {
              "name": "feeGrowthGlobal0X64",
              "docs": [
                "The fee growth as a Q64.64 number, i.e. fees of token_0 and token_1 collected per",
                "unit of liquidity for the entire life of the pool."
              ],
              "type": "u128"
            },
            {
              "name": "feeGrowthGlobal1X64",
              "type": "u128"
            },
            {
              "name": "protocolFeesToken0",
              "docs": [
                "The amounts of token_0 and token_1 that are owed to the protocol."
              ],
              "type": "u64"
            },
            {
              "name": "protocolFeesToken1",
              "type": "u64"
            },
            {
              "name": "swapInAmountToken0",
              "docs": [
                "The amounts in and out of swap token_0 and token_1"
              ],
              "type": "u128"
            },
            {
              "name": "swapOutAmountToken1",
              "type": "u128"
            },
            {
              "name": "swapInAmountToken1",
              "type": "u128"
            },
            {
              "name": "swapOutAmountToken0",
              "type": "u128"
            },
            {
              "name": "status",
              "docs": [
                "Bitwise representation of the state of the pool",
                "bit0, 1: disable open position and increase liquidity, 0: normal",
                "bit1, 1: disable decrease liquidity, 0: normal",
                "bit2, 1: disable collect fee, 0: normal",
                "bit3, 1: disable collect reward, 0: normal",
                "bit4, 1: disable swap, 0: normal"
              ],
              "type": "u8"
            },
            {
              "name": "padding",
              "docs": [
                "Leave blank for future use"
              ],
              "type": {
                "array": [
                  "u8",
                  7
                ]
              }
            },
            {
              "name": "rewardInfos",
              "type": {
                "array": [
                  {
                    "defined": "RewardInfo"
                  },
                  3
                ]
              }
            },
            {
              "name": "tickArrayBitmap",
              "docs": [
                "Packed initialized tick array state"
              ],
              "type": {
                "array": [
                  "u64",
                  16
                ]
              }
            },
            {
              "name": "totalFeesToken0",
              "docs": [
                "except protocol_fee and fund_fee"
              ],
              "type": "u64"
            },
            {
              "name": "totalFeesClaimedToken0",
              "docs": [
                "except protocol_fee and fund_fee"
              ],
              "type": "u64"
            },
            {
              "name": "totalFeesToken1",
              "type": "u64"
            },
            {
              "name": "totalFeesClaimedToken1",
              "type": "u64"
            },
            {
              "name": "fundFeesToken0",
              "type": "u64"
            },
            {
              "name": "fundFeesToken1",
              "type": "u64"
            },
            {
              "name": "openTime",
              "type": "u64"
            },
            {
              "name": "padding1",
              "type": {
                "array": [
                  "u64",
                  25
                ]
              }
            },
            {
              "name": "padding2",
              "type": {
                "array": [
                  "u64",
                  32
                ]
              }
            }
          ]
        }
      },
      {
        "name": "whirlpool",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "whirlpoolsConfig",
              "type": "publicKey"
            },
            {
              "name": "whirlpoolBump",
              "type": {
                "array": [
                  "u8",
                  1
                ]
              }
            },
            {
              "name": "tickSpacing",
              "type": "u16"
            },
            {
              "name": "tickSpacingSeed",
              "type": {
                "array": [
                  "u8",
                  2
                ]
              }
            },
            {
              "name": "feeRate",
              "type": "u16"
            },
            {
              "name": "protocolFeeRate",
              "type": "u16"
            },
            {
              "name": "liquidity",
              "type": "u128"
            },
            {
              "name": "sqrtPrice",
              "type": "u128"
            },
            {
              "name": "tickCurrentIndex",
              "type": "i32"
            },
            {
              "name": "protocolFeeOwedA",
              "type": "u64"
            },
            {
              "name": "protocolFeeOwedB",
              "type": "u64"
            },
            {
              "name": "tokenMintA",
              "type": "publicKey"
            },
            {
              "name": "tokenVaultA",
              "type": "publicKey"
            },
            {
              "name": "feeGrowthGlobalA",
              "type": "u128"
            },
            {
              "name": "tokenMintB",
              "type": "publicKey"
            },
            {
              "name": "tokenVaultB",
              "type": "publicKey"
            },
            {
              "name": "feeGrowthGlobalB",
              "type": "u128"
            },
            {
              "name": "rewardLastUpdatedTimestamp",
              "type": "u64"
            },
            {
              "name": "rewardInfos",
              "type": {
                "array": [
                  {
                    "defined": "WhirlpoolRewardInfo"
                  },
                  3
                ]
              }
            }
          ]
        }
      },
      {
        "name": "config",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "creator",
              "type": "publicKey"
            },
            {
              "name": "tokenMint",
              "type": "publicKey"
            },
            {
              "name": "numOfPools",
              "type": "u8"
            },
            {
              "name": "protocolList",
              "type": {
                "array": [
                  "u8",
                  10
                ]
              }
            },
            {
              "name": "poolDataList",
              "type": {
                "array": [
                  {
                    "defined": "PoolData"
                  },
                  10
                ]
              }
            }
          ]
        }
      },
      {
        "name": "priceContainer",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "price",
              "type": "u128"
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "RewardInfo",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "rewardState",
              "docs": [
                "Reward state"
              ],
              "type": "u8"
            },
            {
              "name": "openTime",
              "docs": [
                "Reward open time"
              ],
              "type": "u64"
            },
            {
              "name": "endTime",
              "docs": [
                "Reward end time"
              ],
              "type": "u64"
            },
            {
              "name": "lastUpdateTime",
              "docs": [
                "Reward last update time"
              ],
              "type": "u64"
            },
            {
              "name": "emissionsPerSecondX64",
              "docs": [
                "Q64.64 number indicates how many tokens per second are earned per unit of liquidity."
              ],
              "type": "u128"
            },
            {
              "name": "rewardTotalEmissioned",
              "docs": [
                "The total amount of reward emissioned"
              ],
              "type": "u64"
            },
            {
              "name": "rewardClaimed",
              "docs": [
                "The total amount of claimed reward"
              ],
              "type": "u64"
            },
            {
              "name": "tokenMint",
              "docs": [
                "Reward token mint."
              ],
              "type": "publicKey"
            },
            {
              "name": "tokenVault",
              "docs": [
                "Reward vault token account."
              ],
              "type": "publicKey"
            },
            {
              "name": "authority",
              "docs": [
                "The owner that has permission to set reward param"
              ],
              "type": "publicKey"
            },
            {
              "name": "rewardGrowthGlobalX64",
              "docs": [
                "Q64.64 number that tracks the total tokens earned per unit of liquidity since the reward",
                "emissions were turned on."
              ],
              "type": "u128"
            }
          ]
        }
      },
      {
        "name": "WhirlpoolRewardInfo",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "mint",
              "docs": [
                "Reward token mint."
              ],
              "type": "publicKey"
            },
            {
              "name": "vault",
              "docs": [
                "Reward vault token account."
              ],
              "type": "publicKey"
            },
            {
              "name": "authority",
              "docs": [
                "Authority account that has permission to initialize the reward and set emissions."
              ],
              "type": "publicKey"
            },
            {
              "name": "emissionsPerSecondX64",
              "docs": [
                "Q64.64 number that indicates how many tokens per second are earned per unit of liquidity."
              ],
              "type": "u128"
            },
            {
              "name": "growthGlobalX64",
              "docs": [
                "Q64.64 number that tracks the total tokens earned per unit of liquidity since the reward",
                "emissions were turned on."
              ],
              "type": "u128"
            }
          ]
        }
      },
      {
        "name": "PoolData",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "poolAccount",
              "type": "publicKey"
            },
            {
              "name": "numOfDependencies",
              "type": "u8"
            },
            {
              "name": "poolDependencies",
              "type": {
                "array": [
                  "publicKey",
                  5
                ]
              }
            }
          ]
        }
      }
    ]
  };
  