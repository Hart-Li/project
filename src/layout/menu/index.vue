<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item.meta.hidden"
        @click="goRoute"
        :index="item.path"
      >
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <template #title>
          {{ item.meta.title }}
        </template>
      </el-menu-item>
    </template>

    <!-- 只有一个子路由 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        @click="goRoute"
        :index="item.children[0].path"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon" />
        </el-icon>
        <template #title>
          {{ item.children[0].meta.title }}
        </template>
      </el-menu-item>
    </template>

    <!-- 子路由大于 1 个 -->
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu v-if="!item.meta.hidden" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon" />
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <CustomMenu :menu-list="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import { MenuItemRegistered } from 'element-plus'
import { useRouter } from 'vue-router'
defineProps(['menuList'])

const router = useRouter()

const goRoute = (item: MenuItemRegistered) => {
  router.push(item.index)
}
</script>
<script lang="ts">
export default {
  name: 'CustomMenu',
}
</script>

<style scoped lang="scss"></style>
