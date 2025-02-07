import type {
  LoginParams,
  LoginResponse,
  UserInfoResponse,
} from '@/api/user/type'
// 创建用户仓库
import { getUserInfo, login } from '@/api/user'
import { constantRoute } from '@/router/route'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import { defineStore } from 'pinia'
import type { UserState } from './types/type'
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      // 用户唯一标识
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  actions: {
    async userLogin(data: LoginParams) {
      const result: LoginResponse = await login(data)
      if (result.code === 200) {
        // pinia 存储 token
        this.token = result.data.token as string
        // 本地持久化存储 token
        SET_TOKEN(result.data.token as string)
        // 保证当前的 async 返回一个成功的 Promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    async getUserInfo() {
      const result: UserInfoResponse = await getUserInfo()
      console.log(result)
      if (result.code === 200) {
        this.username = result.data.checkUser?.username || ''
        this.avatar = result.data.checkUser?.avatar || ''
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    async userLogout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      // 删除本地存储的 token
      REMOVE_TOKEN()
    },
  },
  getters: {},
})

export default useUserStore
