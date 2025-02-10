// 统一管理用户相关的接口
import request from '@/utils/request'
import { ResponseData } from '../type'
import { LoginParams, LoginResponseData, UserInfoResponseData } from './type'
enum API {
  LOGIN_URL = '/admin/acl/index/login', // 登录
  USERINFO_URL = '/admin/acl/index/info', // 获取用户信息
  LOGOUT_URL = '/admin/acl/index/logout', // 退出登录
}
// 暴露请求函数
export const login = (data: LoginParams) =>
  request.post<any, ResponseData<LoginResponseData>>(API.LOGIN_URL, data)

export const getUserInfo = () =>
  request.get<any, ResponseData<UserInfoResponseData>>(API.USERINFO_URL)

export const logout = () => request.post<any, ResponseData<any>>(API.LOGOUT_URL)
