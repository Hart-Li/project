import { ResponseData } from '@/api/type'
import request from '@/utils/request'
import {
  SaveOrUpdateSpuDataParams,
  SpuDataReq,
  SpuImageData,
  SpuListData,
  SpuSaleAttrData,
  SpuSaleAttrList,
} from './type'

enum API {
  // 分页获取三级分类下的 SPU 列表
  GET_SPU_LIST_URL = '/admin/product',
  // 保存 SPU 信息
  SAVE_SPU_INFO_URL = '/admin/product/saveSpuInfo',
  // 更新 SPU 信息
  UPDATE_SPU_INFO_URL = '/admin/product/updateSpuInfo',
  // 删除 SPU 信息
  DELETE_SPU_URL = '/admin/product/deleteSpu',
  // 获取某个 SPU 下的所有的图片数据
  GET_SPU_IMAGES_URL = '/admin/product/spuImageList',
  // 获取某个 SPU 下的所有的销售属性数据
  GET_SPU_SALE_ATTR_URL = '/admin/product/spuSaleAttrList',
  // 获取所有的销售属性值数据
  GET_SPU_ALL_SALE_ATTR_URL = '/admin/product/baseSaleAttrList',
}

export const getSpuList = (page: number, limit: number, params: SpuDataReq) =>
  request.get<any, ResponseData<SpuListData>>(
    `${API.GET_SPU_LIST_URL}/${page}/${limit}`,
    { params },
  )

export const saveOrUpdateSpuData = (data: SaveOrUpdateSpuDataParams) => {
  if (data.id) {
    return request.post<any, ResponseData>(API.UPDATE_SPU_INFO_URL, data)
  } else {
    return request.post<any, ResponseData>(API.SAVE_SPU_INFO_URL, data)
  }
}

export const deleteSpu = (id: number) =>
  request.delete<any, ResponseData>(`${API.DELETE_SPU_URL}/${id}`)

export const getSpuImages = (spuId: number) =>
  request.get<any, ResponseData<SpuImageData[]>>(
    `${API.GET_SPU_IMAGES_URL}/${spuId}`,
  )

export const getSpuSaleAttr = (spuId: number) =>
  request.get<any, ResponseData<SpuSaleAttrList[]>>(
    `${API.GET_SPU_SALE_ATTR_URL}/${spuId}`,
  )

export const getSpuAllSaleAttr = () =>
  request.get<any, ResponseData<SpuSaleAttrData[]>>(
    API.GET_SPU_ALL_SALE_ATTR_URL,
  )
