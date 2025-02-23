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
        <div class="middle">
          <Map class="map" />
          <Line class="line" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <Year class="year" />
          <Order class="order" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 顶部区域
import Top from '@/views/screen/components/top/index.vue'
// 左侧区域
import Age from '@/views/screen/components/age/index.vue'
import Sex from '@/views/screen/components/sex/index.vue'
import Tourist from '@/views/screen/components/tourist/index.vue'
// 中间区域
import Line from '@/views/screen/components/line/index.vue'
import Map from '@/views/screen/components/map/index.vue'
// 右侧区域
import Order from '@/views/screen/components/order/index.vue'
import Rank from '@/views/screen/components/rank/index.vue'
import Year from '@/views/screen/components/year/index.vue'
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
        display: flex;
        flex-direction: column;

        .map {
          flex: 3;
        }

        .line {
          flex: 1;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;

        .rank {
          flex: 1;
        }

        .year {
          flex: 1;
        }

        .order {
          flex: 1;
        }
      }
    }
  }
}
</style>
