import { ResponseData } from '@/api/type'
import request from '@/utils/request'
import { SaveOrUpdateSkuData, SkuListData } from './type'

enum API {
  // 添加 sku 信息
  SAVE_SKU_INFO_URL = '/admin/product/saveSkuInfo',
  // 更新 sku 信息
  UPDATE_SKU_INFO_URL = '/admin/product/updateSkuInfo',
  // 删除 sku 信息
  DELETE_SKU_INFO_URL = '/admin/product/deleteSku',
  // 根据skuId获取sku信息
  GET_SKU_INFO_BY_ID_URL = '/admin/product/getSkuById',
  // 根据spuId获取sku列表
  GET_SKU_LIST_BY_SPU_URL = '/admin/product/findBySpuId',
  // 分页获取sku列表
  GET_SKU_LIST_URL = '/admin/product/list',
  // 上架sku
  ON_SALE_SKU_URL = '/admin/product/onSale',
  // 下架sku
  CANCEL_SALE_SKU_URL = '/admin/product/cancelSale',
}

export const saveOrUpdateSkuInfo = (data: SaveOrUpdateSkuData) => {
  if (data.id) {
    return request.post<any, ResponseData>(API.UPDATE_SKU_INFO_URL, data)
  } else {
    return request.post<any, ResponseData>(API.SAVE_SKU_INFO_URL, data)
  }
}

export const deleteSkuInfo = (skuId: number) =>
  request.delete<any, ResponseData>(`${API.DELETE_SKU_INFO_URL}/${skuId}`)

export const getSkuInfoById = (skuId: number) =>
  request.get<any, ResponseData<SaveOrUpdateSkuData>>(
    `${API.GET_SKU_INFO_BY_ID_URL}/${skuId}`,
  )

export const getSkusBySpuId = (spuId: number) =>
  request.get<any, ResponseData<SaveOrUpdateSkuData[]>>(
    `${API.GET_SKU_LIST_BY_SPU_URL}/${spuId}`,
  )

export const getSkus = (pageNo: number, pageSize: number) =>
  request.get<any, ResponseData<SkuListData>>(
    `${API.GET_SKU_LIST_URL}/${pageNo}/${pageSize}`,
  )

export const onSaleSku = (skuId: number) =>
  request.get<any, ResponseData>(`${API.ON_SALE_SKU_URL}/${skuId}`)

export const cancelSaleSku = (skuId: number) =>
  request.get<any, ResponseData>(`${API.CANCEL_SALE_SKU_URL}/${skuId}`)
