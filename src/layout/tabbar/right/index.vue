<template>
  <el-button icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button icon="FullScreen" circle @click="changeFullScreen"></el-button>
  <el-popover placement="bottom" title="系统配置" :width="400" trigger="click">
    <div>
      主题设置：
      <el-color-picker
        v-model="settingStore.themeColor"
        :predefine="predefineColors"
        :show-alpha="true"
        @active-change="handleChangeThemeColor"
      ></el-color-picker>
    </div>
    <div>
      暗黑模式:
      <el-switch
        v-model="settingStore.darkSwitch"
        :active-value="true"
        :inactive-value="false"
        @change="handleChangeDarkSwitch"
      ></el-switch>
    </div>
    <template #reference>
      <el-button icon="Setting" circle></el-button>
    </template>
  </el-popover>

  <img
    :src="userStore.avatar"
    style="width: 32px; height: 32px; margin: 0 10px; border-radius: 50%"
  />
  <el-dropdown>
    <span class="el-dropdown-link">{{ userStore.username }}</span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import router from '@/router'
import useSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { onMounted, ref } from 'vue'

const settingStore = useSettingStore()
const userStore = useUserStore()
// 设置刷新标记
const updateRefresh = () => {
  if (!settingStore.refresh) {
    settingStore.refresh = true
  }
}
// 全屏功能
const changeFullScreen = () => {
  // DOM 对象的一个属性：可以用来判断当前是否是全屏模式，全屏则返回true，否则返回false
  let fullFlag = document.fullscreenElement
  if (fullFlag) {
    // 若是全屏，则调用 document 对象的 exitFullscreen() 方法，退出全屏模式
    document.exitFullscreen()
  } else {
    // 若不是全屏，则调用根节点的 requestFullscreen() 方法，进入全屏模式
    document.documentElement.requestFullscreen()
  }
}
const logout = async () => {
  // 1.发送退出登录的请求
  // 2.清空仓库的数据
  await userStore.userLogout()
  // 3.跳转到登录页
  router.push({
    path: '/login',
    query: { redirect: router.currentRoute.value.fullPath },
  })
}

const setDocumentThemeColor = () => {
  document.documentElement.style.setProperty(
    '--el-color-primary',
    settingStore.themeColor,
  )
}

const setDocumentDarkStyle = () => {
  document.documentElement.className = settingStore.darkSwitch ? 'dark' : ''
}

// 加载时设置主题颜色
onMounted(() => {
  setDocumentThemeColor()
  setDocumentDarkStyle()
})
// 预设颜色
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const handleChangeThemeColor = (color: string) => {
  console.log(color)
  settingStore.setThemeColor(color)
  setDocumentThemeColor()
}

// 暗黑模式开关

const handleChangeDarkSwitch = (value: boolean) => {
  settingStore.setDarkSwitch(value)
  setDocumentDarkStyle()
}
</script>
<script lang="ts">
export default {
  name: 'TabbarRight',
}
</script>

<style scoped lang="scss"></style>
