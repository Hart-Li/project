export interface TradeMarkData {
  records: TradeMark[]
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number
}

export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}
