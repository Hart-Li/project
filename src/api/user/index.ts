// 统一管理用户相关的接口
import request from '@/utils/request'
import type { LoginParams, LoginResponse, UserInfoResponse } from './type'
enum API {
  LOGIN_URL = '/user/login', // 登录
  USERINFO_URL = '/user/info', // 获取用户信息
}
// 暴露请求函数
export const login = (data: LoginParams) =>
  request.post<any, LoginResponse>(API.LOGIN_URL, data)

export const getUserInfo = () =>
  request.get<any, UserInfoResponse>(API.USERINFO_URL)
