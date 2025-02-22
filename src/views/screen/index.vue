<template>
  <div class="container">
    <div class="screen" ref="screenRef">
      <Top />
      <div class="main">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="middle">中间</div>
        <div class="right">右边</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Age from '@/views/screen/components/age/index.vue'
import Sex from '@/views/screen/components/sex/index.vue'
import Top from '@/views/screen/components/top/index.vue'
import Tourist from '@/views/screen/components/tourist/index.vue'
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

    .main {
      width: 100%;
      height: 100%;
      display: flex;

      .left {
        flex: 1;
        display: flex;
        flex-direction: column;

        .tourist {
          flex: 1;
        }

        .sex {
          flex: 1;
        }

        .age {
          flex: 1;
        }
      }

      .middle {
        flex: 2;
        background-color: blueviolet;
      }

      .right {
        flex: 1;
        background-color: chartreuse;
      }
    }
  }
}
</style>
