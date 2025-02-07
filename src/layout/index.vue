<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="settingStore.isCollapse ? 'fold' : ''">
      <Logo />
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          background-color="#001529"
          text-color="#fff"
          :collapse="settingStore.isCollapse"
          :default-active="route.path"
        >
          <!-- 根据路由静态生成菜单 -->
          <CustomMenu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="settingStore.isCollapse ? 'fold' : ''">
      <Tabbar />
    </div>
    <!-- 主内容区 -->
    <div class="layout_main" :class="settingStore.isCollapse ? 'fold' : ''">
      <MainLayout />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import MainLayout from './main/index.vue'
import CustomMenu from './menu/index.vue'
import Tabbar from './tabbar/index.vue'

import useSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = useUserStore()
const settingStore = useSettingStore()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background: red;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - #{$base-tabbar-height});
    }
    &.fold {
      width: $base-menu-fold-width;
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - #{$base-menu-width});
    height: $base-tabbar-height;
    background: $base-tabbar-background;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - #{$base-menu-fold-width});
      left: $base-menu-fold-width;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - #{$base-menu-width});
    height: calc(100vh - #{$base-tabbar-height});
    background: $base-main-background;
    top: $base-tabbar-height;
    left: $base-menu-width;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - #{$base-menu-fold-width});
      left: $base-menu-fold-width;
    }
  }
}
</style>
