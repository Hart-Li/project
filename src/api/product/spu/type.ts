export interface SpuDataReq {
  category3Id?: number
}

export interface SpuData {
  id: number
  spuName: string
  description: string
  category3Id: number
  tmId: number
  spuSaleAttrList?: SpuSaleAttrList[]
  spuImageList?: SpuImageData[]
}

export interface SpuListData {
  records: SpuData[]
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number
}

export interface SpuImageList {
  id?: number
  imgName?: string
  imgUrl?: string
  spuId?: number
  name?: string
  url?: string
}

export interface SpuSaleAttrValueData {
  baseSaleAttrId?: number
  id?: number
  isChecked?: string
  saleAttrName?: string
  saleAttrValueName: string
  spuId?: number
}

export interface SpuSaleAttrList {
  baseSaleAttrId: number
  id?: number
  saleAttrName: string
  spuId?: number
  spuSaleAttrValueList: SpuSaleAttrValueData[]
  showAddBtn?: boolean
  saleAttrValueId?: number
}

export interface SaveOrUpdateSpuDataParams {
  category3Id?: number
  description: string
  id?: number
  spuImageList: SpuImageList[]
  spuName: string
  spuSaleAttrList: SpuSaleAttrList[]
  tmId?: number
}

export interface SpuImageData {
  id: number
  spuId: number
  imgName: string
  imgUrl: string
}

export interface SpuSaleAttrData {
  id: number
  name: string
}
