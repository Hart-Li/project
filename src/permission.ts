// 路由鉴权
import nprogress from 'nprogress'
import router from './router'
import { GET_TOKEN } from './utils/token'

// 路由前置守卫
router.beforeEach((to, _from, next) => {
  // to:将要访问的路由
  // from:从哪个路由发起的访问
  // next:路由的方形函数
  // 开启进度条
  nprogress.start()
  // 获取 token
  const token = GET_TOKEN()
  console.log(token)
  // 判断是否需要登录
  if (to.meta.requiresAuth && !token) {
    // 跳转到登录页
    next('/login')
  } else {
    // 继续路由
    next()
  }
  // 关闭进度条
  nprogress.done()
})

// 路由后置守卫
router.afterEach((to, _from) => {
  // 设置标题
  document.title = to.meta.title
})
