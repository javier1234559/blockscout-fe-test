export type IFakeBlockItem = {
  id: number
  block: {
    name: string
    value: string
    link: string
  }
  age: { value: string }
  transaction: { value: string }
  fee_recipient: {
    value: string
    link: string
  }
  priority_fees: { value: string }
  fee_reward_burnt: { value: string }
  fees: {
    value: string
  }
  gas_used: {
    name: string
    value: string
  }
  gas_limit: {
    name: string
    value: string
  }
}

export type IFakeUnclesItem = {
  id: number
  block: {
    name: string
    value: string
    link: string
  }
  age: { value: string }
  transaction: { value: string }
  miner: {
    value: string
    link: string
  }
  gas_used: {
    name: string
    value: string
  }
  gas_limit: {
    name: string
    value: string
  }
}

export type IFakeReorgsItem = {
  id: number
  block: {
    name: string
    value: string
    link: string
  }
  age: { value: string }
  transaction: { value: string }
  fee_recipient: {
    value: string
    link: string
  }
  priority_fees: { value: string }
  fee_reward_burnt: { value: string }
  fees: {
    value: string
  }
  gas_used: {
    name: string
    value: string
  }
  gas_limit: {
    name: string
    value: string
  }
}
export type IFakeTokenItem = {
  id: number
  token: {
    value: string
  }
  address: {
    value: string
    link: string
  }
  circulating_market_cap: {
    value: string
  }
  total_supply: {
    value: string
  }
  holders_count: {
    value: number
  }
}

export type IFakePoolsAdressItem = {
  id: number
  address: {
    value: string
    link: string
  }
  balance: {
    value: string
  }
  txn_count: {
    value: string
  }
}

export type IFakePendingItem = {
  id: number
  hash: {
    name: string
    value: string
    link: string
  }
  method: { value: string }
  nonce: { value: string }
  last_seen: {
    value: string
  }
  gas_limit: {
    value: string
  }
  gas_price: { value: string }
  from: {
    value: string
    link: string
  }
  to: {
    value: string
    link: string
  }
  amount: {
    value: string
  }
}
