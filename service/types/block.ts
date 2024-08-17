export interface IFakeBlock {
  id: string
  icon: string
  blockNumber: string
  publishedAt: string
  miner: string
  transactionCount: number
  stoc: number
}

export interface IFakeTransaction {
  id: string
  icon: string
  exchangeCode: string
  publishedAt: string
  from: string
  to: string
  stoc: number
}

export type IFakeBlockValidation = {
  id: string
  blockCode: number
  minerCode: string
  transactionCount: number
  byteSize: number
  publishedAt: string
  gasLimit: number
  gasUsed: number
}
