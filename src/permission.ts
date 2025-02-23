// 路由鉴权
import nprogress from 'nprogress'
import router from './router'
import setting from './setting'
import pinia from './store'
import useUserStore from './store/modules/user'

nprogress.configure({ showSpinner: false })
const userStore = useUserStore(pinia)

// 路由前置守卫
router.beforeEach(async (to, _from, next) => {
  // to:将要访问的路由
  // from:从哪个路由发起的访问
  // next:路由的方形函数
  // 开启进度条
  nprogress.start()
  // 获取 token
  const token = userStore.token
  // 判断是否需要登录
  if (token) {
    // 如果有 token，判断是否访问 /login
    if (to.path === '/login') {
      // 如果访问 /login，跳转到首页
      next('/')
    } else {
      // 如果访问其他路由，放行
      if (userStore.username) {
        next()
      } else {
        await userStore
          .getUserInfo()
          .then(() => {
            next({ ...to })
          })
          .catch(async () => {
            await userStore.userLogout()
            next({ path: '/login', query: { redirect: to.path } })
          })
      }
    }
  } else {
    // 如果没有 token，判断是否访问 /login
    if (to.path === '/login') {
      // 如果访问 /login，放行
      next()
    } else {
      // 如果访问其他路由，跳转到 /login
      next({ path: '/login', query: { redirect: to.path } })
    }
  }

  // 关闭进度条
  nprogress.done()
})

// 路由后置守卫
router.afterEach((to) => {
  // 设置标题
  document.title = (setting.title + '-' + to.meta.title) as string
})

// 第一个问题：任意路由切换实现进度条
// 第二个问题：路由鉴权
// 用户未登录，不可以访问其他路由，只可以访问 /login
// 用户登录，不可以访问 /login，但可以访问其他路由
// 第三个问题：全部路由组件
