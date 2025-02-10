// 品牌管理相关的接口
import { ResponseData } from '@/api/type'
import request from '@/utils/request'
import { TradeMark, TradeMarkData } from './type'

enum API {
  // 获取已有品牌列表
  TRADEMARK_URL = '/admin/product/baseTrademark',
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
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
