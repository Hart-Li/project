<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component v-if="componentExist" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting'
import { watch, ref, nextTick } from 'vue'

// 根据该标记判断内容区域渲染还是销毁组件
const componentExist = ref(true)
const settingStore = useSettingStore()
// 监听刷新标记
watch(
  () => settingStore.refresh,
  (newVal) => {
    if (newVal) {
      componentExist.value = false
      // 上一步执行完成后再执行 nextTick 内的逻辑
      nextTick(() => {
        componentExist.value = true
        settingStore.refresh = false
      })
    }
  },
)
</script>
<script lang="ts">
export default {
  name: 'MainLayout',
}
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
