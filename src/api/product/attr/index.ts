import type { ResponseData } from '@/api/type'
import request from '@/utils/request'
import type { CategoryData, ProductAttrData } from './type'

enum API {
  GET_CATEGORY1_LIST_URL = '/admin/product/getCategory1',
  GET_CATEGORY2_LIST_URL = '/admin/product/getCategory2',
  GET_CATEGORY3_LIST_URL = '/admin/product/getCategory3',
  GET_ATTR_INFO_LIST_URL = '/admin/product/attrInfoList',
  SAVE_ATTR_INFO_URL = '/admin/product/saveAttrInfo',
  DELETE_ATTR_INFO_URL = '/admin/product/deleteAttr',
}

export const getCategory1List = () =>
  request.get<any, ResponseData<CategoryData[]>>(API.GET_CATEGORY1_LIST_URL)

export const getCategory2List = (category1Id: number) =>
  request.get<any, ResponseData<CategoryData[]>>(
    `${API.GET_CATEGORY2_LIST_URL}/${category1Id}`,
  )

export const getCategory3List = (category2Id: number) =>
  request.get<any, ResponseData<CategoryData[]>>(
    `${API.GET_CATEGORY3_LIST_URL}/${category2Id}`,
  )

export const getAttrInfoList = (
  category1Id: number,
  category2Id: number,
  category3Id: number,
) =>
  request.get<any, ResponseData<ProductAttrData[]>>(
    `${API.GET_ATTR_INFO_LIST_URL}/${category1Id}/${category2Id}/${category3Id}`,
  )

export const saveAttrInfo = (data: ProductAttrData) =>
  request.post<any, ResponseData>(API.SAVE_ATTR_INFO_URL, data)

export const deleteAttrInfo = (attrId: number) =>
  request.delete<any, ResponseData>(`${API.DELETE_ATTR_INFO_URL}/${attrId}`)
