// 登录接口参数类型
export interface LoginParams {
  username: string
  password: string
}

interface DataType {
  token?: string
  message?: string
}

export interface LoginResponse {
  code: number
  data: DataType
}

// 用户信息接口相关数据类型
interface UserInfoDataType {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface UserDataType {
  checkUser?: UserInfoDataType
  message?: string
}
export interface UserInfoResponse {
  code: number
  data: UserDataType
}
