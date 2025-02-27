import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
//@ts-expect-error Element Plus 的中文语言包类型定义问题
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'nprogress/nprogress.css'
import 'virtual:svg-icons-register'
import globalComponents from './components'
import { isHasButton } from './directive/has'
import './permission'
import router from './router'
import pinia from './store'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(globalComponents)
app.use(pinia)
app.use(router)
isHasButton(app)
app.mount('#app')
