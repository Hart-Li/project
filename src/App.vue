<template>
  <div>
    <div>测试 scss 全局变量</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { getUserInfo, login } from './api/user'
onMounted(() => {
  login({
    username: 'admin',
    password: '111111',
  })
  let res = getUserInfo()
  console.log(res)
})
</script>

<style scoped lang="scss">
div {
  color: $color;
}
</style>
