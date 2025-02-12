import {
  getCategory1List,
  getCategory2List,
  getCategory3List,
} from '@/api/product/attr'
import { CategoryData } from '@/api/product/attr/type'
import { ResponseData, SUCCESS_CODE } from '@/api/type'
import { defineStore } from 'pinia'
import { CategoryState } from './types/type'

const useCategoryStore = defineStore('category', {
  state: (): CategoryState => {
    return {
      // 被选择的一级分类ID
      c1Id: undefined,
      // 一级分类列表
      c1Arr: [],
      // 被选择的二级分类ID
      c2Id: undefined,
      // 二级分类列表
      c2Arr: [],
      // 被选择的三级分类ID
      c3Id: undefined,
      // 三级分类列表
      c3Arr: [],
    }
  },
  actions: {
    async getCategory1List() {
      const result: ResponseData<CategoryData[]> = await getCategory1List()
      if (result.code === SUCCESS_CODE) {
        this.c1Arr = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async getCategory2List() {
      const result: ResponseData<CategoryData[]> = await getCategory2List(
        this.c1Id!,
      )
      if (result.code === SUCCESS_CODE) {
        this.c2Arr = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async getCategory3List() {
      const result: ResponseData<CategoryData[]> = await getCategory3List(
        this.c2Id!,
      )
      if (result.code === SUCCESS_CODE) {
        this.c3Arr = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    resetCategory2Data() {
      this.c2Id = 0
      this.c2Arr = []
    },
    resetCategory3Data() {
      this.c3Id = 0
      this.c3Arr = []
    },
  },
  getters: {},
})

export default useCategoryStore
