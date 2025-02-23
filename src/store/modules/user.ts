// 创建用户仓库
import { ResponseData, USER_SUCCESS_CODE } from '@/api/type'
import { getUserInfo, login, logout } from '@/api/user'
import {
  LoginParams,
  LoginResponseData,
  UserInfoResponseData,
} from '@/api/user/type'
import { anyRoute, constantRoute, dynamicRoutes } from '@/router/route'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import _ from 'lodash'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import type { UserState } from './types/type'

const filterDynamicRoutes = (dynamicRoutes: any, userRoutes: string[]) => {
  const res = dynamicRoutes.filter((route: any) => {
    if (userRoutes.includes(route.name as string)) {
      if (route.children) {
        route.children = filterDynamicRoutes(
          _.cloneDeep(route.children),
          userRoutes,
        )
      }
      return true
    }
    return false
  })
  return res
}

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      // 用户唯一标识
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      userBtns: [],
    }
  },
  actions: {
    async userLogin(data: LoginParams) {
      const result: ResponseData<LoginResponseData> = await login(data)

      if (result.code === USER_SUCCESS_CODE) {
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
      const router = useRouter()
      const result: ResponseData<UserInfoResponseData> = await getUserInfo()
      if (result.code === USER_SUCCESS_CODE) {
        this.username = result.data.name || ''
        this.avatar = result.data.avatar || ''
        // 过滤动态路由
        const userDynamicRoutes = filterDynamicRoutes(
          dynamicRoutes,
          result.data.routes || [],
        )
        // 合并动态路由 & 添加到路由表
        const userAllRoutes = [...constantRoute, ...userDynamicRoutes, anyRoute]
        this.menuRoutes = userAllRoutes
        this.resetRouter()
        userAllRoutes.forEach((item) => {
          router.addRoute(item)
        })
        this.userBtns = result.data.buttons
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout() {
      const result: ResponseData = await logout()
      if (result.code === USER_SUCCESS_CODE) {
        this.resetUser()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    resetUser() {
      this.token = ''
      this.avatar = ''
      this.username = ''
      // 删除本地存储的 token
      REMOVE_TOKEN()
    },
    resetRouter() {
      // router
      //   .getRoutes()
      //   .filter((route: any) => {
      //     const constantRouteNames = constantRoute.map((item) => item.name)
      //     if (
      //       anyRoute.name === route.name ||
      //       constantRouteNames.includes(route.name)
      //     ) {
      //       return false
      //     }
      //     return true
      //   })
      //   .forEach((route: any) => {
      //     router.removeRoute(route.name)
      //   })
    },
  },
  getters: {},
})

export default useUserStore
