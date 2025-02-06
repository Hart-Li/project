<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo />
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu background-color="$base-menu-background" text-color="#fff">
          <!-- 根据路由静态生成菜单 -->
          <CustomMenu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar">456</div>
    <!-- 主内容区 -->
    <div class="layout_main">
      <p style="background: red; height: 10000px; margin-left: 10px">
        我是一个段落
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import CustomMenu from './menu/index.vue'

import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
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
    .scrollbar {
      width: 100%;
      height: calc(100vh - #{$base-tabbar-height});
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - #{$base-menu-width});
    height: $base-tabbar-height;
    background: $base-tabbar-background;
    top: 0;
    left: $base-menu-width;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - #{$base-menu-width});
    height: calc(100vh - #{$base-tabbar-height});
    background: $base-main-background;
    top: $base-tabbar-height;
    left: $base-menu-width;
    overflow: auto;
  }
}
</style>
