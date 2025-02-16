export interface SkuAttrValueData {
  attrId: number
  attrName?: string
  id?: number
  skuId?: number
  valueId: number
  valueName?: string
}

export interface SkuImageData {
  id: number
  imgName: string
  imgUrl: string
  isDefault: string
  skuId: number
  spuImgId: number
}

export interface SkuSaleAttrValueData {
  id?: number
  saleAttrId: number
  saleAttrName?: string
  saleAttrValueId?: number
  saleAttrValueName?: string
  skuId?: number
  spuId?: number
}

export interface SaveOrUpdateSkuData {
  category3Id?: number
  createTime?: string
  id?: number
  isSale?: number
  price?: number
  skuAttrValueList: SkuAttrValueData[]
  skuDefaultImg: string
  skuDesc: string
  skuImageList: SkuImageData[]
  skuName: string
  skuSaleAttrValueList: SkuSaleAttrValueData[]
  spuId?: number
  tmId?: number
  weight: string
}

export interface SkuListData {
  records: SaveOrUpdateSkuData[]
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number
}
