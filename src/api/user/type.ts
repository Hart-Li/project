export interface LoginParams {
  username: string
  password: string
}

export interface ResponseData<T = any> {
  code: number
  data: T
  message: string
  ok: boolean
}

export interface LoginResponseData {
  token: string
}

export interface UserInfoResponseData {
  routes: string[]
  buttons: string[]
  roles: string[]
  name: string
  avatar: string
}
