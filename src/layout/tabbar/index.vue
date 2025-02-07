<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <TabbarLeft />
    </div>
    <div class="tabbar_right">
      <TabbarRight />
    </div>
  </div>
</template>

<script setup lang="ts">
import TabbarLeft from './left/index.vue'
import TabbarRight from './right/index.vue'
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  background-image: linear-gradient(to right, #d032b8, #3a8ee6, #32b8d0);
  .tabbar_left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
