// 创建用户仓库
import { getUserInfo, login, logout } from '@/api/user'
import {
  LoginParams,
  LoginResponseData,
  ResponseData,
  UserInfoResponseData,
} from '@/api/user/type'
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
      const result: ResponseData<LoginResponseData> = await login(data)

      if (result.code === 20000) {
        // pinia 存储 token
        this.token = result.data.token as string
        // 本地持久化存储 token
        SET_TOKEN(result.data.token as string)
        // 保证当前的 async 返回一个成功的 Promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async getUserInfo() {
      const result: ResponseData<UserInfoResponseData> = await getUserInfo()
      if (result.code === 20000) {
        this.username = result.data.name || ''
        this.avatar = result.data.avatar || ''
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout() {
      const result: ResponseData = await logout()
      if (result.code === 20000) {
        this.resetUser()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    resetUser() {
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
