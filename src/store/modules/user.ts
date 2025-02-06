import type { LoginParams, LoginResponse } from '@/api/user/type'
// 创建用户仓库
import { login } from '@/api/user'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
import { defineStore } from 'pinia'
import type { UserState } from './types/type'
import { constantRoute } from '@/router/route'
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      // 用户唯一标识
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
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
  },
  getters: {},
})

export default useUserStore
