<template>
  <el-button icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button icon="FullScreen" circle @click="changeFullScreen"></el-button>
  <el-button icon="Setting" circle></el-button>
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
import useSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import router from '@/router'

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
const logout = () => {
  // 1.发送退出登录的请求
  // 2.清空仓库的数据
  userStore.userLogout()
  // 3.跳转到登录页
  router.push({
    path: '/login',
    query: { redirect: router.currentRoute.value.fullPath },
  })
}
</script>
<script lang="ts">
export default {
  name: 'TabbarRight',
}
</script>

<style scoped lang="scss"></style>
