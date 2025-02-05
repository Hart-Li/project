import type { LoginParams } from '@/api/user/type'
// 创建用户仓库
import { login } from '@/api/user'
import { defineStore } from 'pinia'
const TOKEN_KEY = 'token'
const useUserStore = defineStore('User', {
  state: () => {
    return {
      // 用户唯一标识
      token: localStorage.getItem(TOKEN_KEY) || '',
    }
  },
  actions: {
    async userLogin(data: LoginParams) {
      const result = await login(data)
      if (result.code === 200) {
        // pinia 存储 token
        this.token = result.data.token
        // 本地持久化存储 token
        localStorage.setItem(TOKEN_KEY, result.data.token)
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
