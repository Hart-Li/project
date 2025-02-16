import type { ResponseData } from '@/api/type'
import request from '@/utils/request'
import type { CategoryData, ProductAttrData } from './type'

enum API {
  // 获取一级分类列表
  GET_CATEGORY1_LIST_URL = '/admin/product/getCategory1',
  // 获取二级分类列表
  GET_CATEGORY2_LIST_URL = '/admin/product/getCategory2',
  // 获取三级分类列表
  GET_CATEGORY3_LIST_URL = '/admin/product/getCategory3',
  // 获取属性列表
  GET_ATTR_INFO_LIST_URL = '/admin/product/attrInfoList',
  // 保存或修改属性信息
  SAVE_ATTR_INFO_URL = '/admin/product/saveAttrInfo',
  // 删除属性信息
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
