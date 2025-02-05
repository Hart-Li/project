// 进行 axios 的二次封装: 1. 统一处理请求异常 2. 统一处理请求 loading 3. 统一处理请求结果
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 第一步：利用 axios 对象的 create 方法创建一个新的 axios 实例(其他的配置：基础路径、超时时间等)
const request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
// 第二步：request 实例添加请求拦截器
request.interceptors.request.use((config) => {
  // config 配置对象,headers 属性请求头，经常给服务端携带公共参数
  config.headers.token = 'Admin Token'
  // 返回请求对象
  return config
})
// 第三步：request 实例添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // response 响应对象，data 属性是服务端返回的数据
    // 返回响应对象
    return response.data
  },
  (error) => {
    // error 错误对象，包含错误码、错误信息等
    let message = ''
    const status = error.response?.status
    switch (status) {
      case 400:
        message = '请求参数错误'
        break
      case 401:
        message = '没有权限'
        break
      case 403:
        message = '登录过期'
        break
      case 404:
        message = '请求路径不存在'
        break
      case 500:
        message = '服务器错误'
        break
      default:
        message = '未知错误'
        break
    }
    ElMessage.error(message)
    // 返回错误对象
    return Promise.reject(error)
  },
)
export default request
