// 品牌管理相关的接口
import { ResponseData } from '@/api/type'
import request from '@/utils/request'
import { TradeMark, TradeMarkData } from './type'

enum API {
  // 获取已有品牌列表
  TRADEMARK_URL = '/admin/product/baseTrademark',
  // 添加品牌数据
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 更新品牌数据
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌数据
  DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove',
  // 获取全部品牌数据
  GET_ALL_TRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
}

export const getTrademarkList = (page: number, limit: number) =>
  request.get<any, ResponseData<TradeMarkData>>(
    `${API.TRADEMARK_URL}/${page}/${limit}`,
  )

export const addOrUpdateTradeMark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, ResponseData>(API.UPDATE_TRADEMARK_URL, data)
  } else {
    return request.post<any, ResponseData>(API.ADD_TRADEMARK_URL, data)
  }
}

export const removeTradeMark = (id: number) =>
  request.delete<any, ResponseData>(`${API.DELETE_TRADEMARK_URL}/${id}`)

export const getAllTradeMarkList = () =>
  request.get<any, ResponseData<TradeMark[]>>(API.GET_ALL_TRADEMARK_URL)
