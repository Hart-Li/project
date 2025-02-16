import { ResponseData } from '@/api/type'
import request from '@/utils/request'
import { SaveOrUpdateSkuData } from './type'

enum API {
  // 添加 sku 信息
  SAVE_SKU_INFO_URL = '/admin/product/saveSkuInfo',
  // 更新 sku 信息
  UPDATE_SKU_INFO_URL = '/admin/product/updateSkuInfo',
  // 根据spuId获取sku列表
  GET_SKU_LIST_URL = '/admin/product/findBySpuId',
}

export const saveOrUpdateSkuInfo = (data: SaveOrUpdateSkuData) => {
  if (data.id) {
    return request.post<any, ResponseData>(API.UPDATE_SKU_INFO_URL, data)
  } else {
    return request.post<any, ResponseData>(API.SAVE_SKU_INFO_URL, data)
  }
}

export const getSkusBySpuId = (spuId: number) =>
  request.get<any, ResponseData<SaveOrUpdateSkuData[]>>(
    `${API.GET_SKU_LIST_URL}/${spuId}`,
  )
