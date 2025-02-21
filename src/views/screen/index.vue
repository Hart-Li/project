<template>
  <div class="container">
    <div class="screen" ref="screenRef">
      <Top />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Top from '@/views/screen/components/top/index.vue'
import { onMounted, ref } from 'vue'

const calcScale = (w: number = 1920, h: number = 1080) => {
  const scale = Math.min(window.innerWidth / w, window.innerHeight / h)
  return `scale(${scale})`
}

let screenRef = ref()

onMounted(() => {
  screenRef.value.style.transform = `${calcScale()} translate(-50%, -50%)`
})

window.onresize = () => {
  screenRef.value.style.transform = `${calcScale()} translate(-50%, -50%)`
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url('@/views/screen/images/bg.png') no-repeat;
  background-size: cover;

  .screen {
    width: 1920px;
    height: 1080px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transform-origin: left top;
    background-color: red;
  }
}
</style>
