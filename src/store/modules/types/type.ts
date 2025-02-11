import { CategoryData } from '@/api/product/attr/type'
import type { RouteRecordRaw } from 'vue-router'
// 定义小仓库的数据类型
export interface UserState {
  token: string
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

export interface CategoryState {
  // 被选择的一级分类ID
  c1Id?: number
  // 一级分类列表
  c1Arr: CategoryData[]
  // 被选择的二级分类ID
  c2Id?: number
  // 二级分类列表
  c2Arr: CategoryData[]
  // 被选择的三级分类ID
  c3Id?: number
  // 三级分类列表
  c3Arr: CategoryData[]
}
