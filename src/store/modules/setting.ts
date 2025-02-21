import { defineStore } from 'pinia'

const LOCAL_THEME_COLOR = 'THEME_COLOR'
const LOCAL_DARK_SWITCH = 'DARK_SWITCH'
const useSettingStore = defineStore('Setting', {
  state: () => {
    return {
      isCollapse: false, // 折叠标记
      refresh: false, // 刷新标记
      themeColor:
        localStorage.getItem(LOCAL_THEME_COLOR) || 'rgba(255, 69, 0, 0.68)', // 主题颜色
      darkSwitch:
        localStorage.getItem(LOCAL_DARK_SWITCH) === 'true' ? true : false, // 深色模式
    }
  },
  actions: {
    setThemeColor(color: string) {
      this.themeColor = color
      localStorage.setItem(LOCAL_THEME_COLOR, color)
    },
    setDarkSwitch(switchValue: boolean) {
      this.darkSwitch = switchValue
      localStorage.setItem(LOCAL_DARK_SWITCH, switchValue.toString())
    },
  },
  getters: {},
})

export default useSettingStore
