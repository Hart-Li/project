export interface ResponseData<T = any> {
  code: number
  data: T
  message: string
  ok: boolean
}
export const SUCCESS_CODE = 200
export const USER_SUCCESS_CODE = 20000
