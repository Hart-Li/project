// 通过 vue-router 插件实现模板路由配置
import { createRouter, createWebHashHistory, type Router } from 'vue-router'
import { constantRoute } from './route'

// 创建路由器
const router: Router = createRouter({
  // 路由模式 hash
  history: createWebHashHistory(),
  routes: constantRoute,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
