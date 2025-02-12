export interface CategoryData {
  id: number
  name: string
  category1Id?: number
  category2Id?: number
}

export interface ProductAttrValue {
  id: number | undefined
  valueName: string
  attrId: number | undefined
  isEdit: boolean
}

export interface ProductAttrData {
  id?: number | undefined
  attrName: string
  categoryId: number | undefined
  categoryLevel: number | undefined
  attrValueList: ProductAttrValue[]
}
