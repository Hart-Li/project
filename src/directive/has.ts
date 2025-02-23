import pinia from '@/store'
import useUserStore from '@/store/modules/user'
import { App } from 'vue'

const userStore = useUserStore(pinia)
export const isHasButton = (app: App) => {
  app.directive('has', {
    mounted(el: any, binding: any) {
      if (!userStore.userBtns.includes(binding.value)) {
        el.parentNode?.removeChild(el)
      }
    },
  })
}
