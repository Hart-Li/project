import { defineStore } from 'pinia'
const useSettingStore = defineStore('Setting', {
  state: () => {
    return {
      isCollapse: false, // 折叠标记
      refresh: false, // 刷新标记
    }
  },
  actions: {},
  getters: {},
})

export default useSettingStore
