// 品牌管理相关的接口
import request from '@/utils/request'

enum API {
  // 获取已有品牌列表
  TRADEMARK_URL = '/admin/product/baseTrademark',
}

export const getTrademarkList = (page: number, limit: number) =>
  request.get<any, any>(`${API.TRADEMARK_URL}/${page}/${limit}`)
