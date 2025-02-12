<template>
  <!-- 菜单展开收起按钮 -->
  <el-icon @click="changeCollapse" size="32" style="margin-right: 10px">
    <component :is="settingStore.isCollapse ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 菜单面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in route.matched"
      :key="index"
      :to="{ path: `${item.path}` }"
      v-show="item.meta.title"
    >
      <div class="breadcrumb-item-content">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'

const route = useRoute()
const settingStore = useSettingStore()

const changeCollapse = () => {
  settingStore.isCollapse = !settingStore.isCollapse
}
</script>
<script lang="ts">
export default {
  name: 'TabbarLeft',
}
</script>

<style scoped lang="scss">
.breadcrumb-item-content {
  display: flex;
  align-items: center;
}
</style>
