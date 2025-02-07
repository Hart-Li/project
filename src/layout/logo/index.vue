<template>
  <div class="logo" v-if="!setting.logoHidden">
    <img :src="setting.logo" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  color: white;
  padding: 5px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-menu-logo-title-font-size;
    margin-left: 10px;
  }
}
</style>
