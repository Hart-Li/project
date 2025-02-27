import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App, Component } from 'vue'
import SvgIcon from './SvgIcon/index.vue'

const components: { [name: string]: Component } = { SvgIcon }

export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
    // 将element-plus 提供的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
