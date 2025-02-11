export interface CategoryData {
  id: number
  name: string
  category1Id?: number
  category2Id?: number
}

export interface ProductAttrValue {
  id: number
  valueName: string
  attrId: number
}

export interface ProductAttrData {
  id: number
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: ProductAttrValue[]
}
