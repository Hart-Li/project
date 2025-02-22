<template>
  <BasePart :topTitle="topTitle">
    <template #top-other>
      <span class="order-text">
        可预约总量&nbsp;
        <span class="order-count">99999</span>
        &nbsp;人
      </span>
    </template>
    <template #main>
      <div class="people-count">
        <span
          class="people-count-text"
          v-for="(item, index) in peopleCountStr"
          :key="index"
        >
          {{ item }}
        </span>
      </div>
      <div class="proportional-ball" ref="proportionalBallRef"></div>
    </template>
  </BasePart>
</template>

<script setup lang="ts">
import BasePart from '@/components/BasePart/index.vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill/src/liquidFill.js'
import { onMounted, ref } from 'vue'

let topTitle = ref('游客实时统计')
let peopleCountStr = ref('215908人')
let proportionalBallRef = ref()

onMounted(() => {
  let mycharts = echarts.init(proportionalBallRef.value)
  let option = {
    series: [
      {
        type: 'liquidFill',
        data: [0.6, 0.6, 0.6, 0.6],
        color: ['#294D99', '#156ACF', '#1598ED', '#45BDFF'],
        radius: '90%',
        waveAnimation: true,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        animationDuration: 2000,
        animationDurationUpdate: 1000,

        outline: {
          show: true,
          borderDistance: 8,
          itemStyle: {
            color: 'none',
            borderColor: '#294D99',
            borderWidth: 8,
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
          },
        },

        backgroundStyle: {
          color: '#E3F7FF',
        },

        itemStyle: {
          opacity: 0.95,
          shadowBlur: 50,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
        },

        label: {
          show: true,
          color: '#294D99',
          insideColor: '#fff',
          fontSize: 50,
          fontWeight: 'bold',

          align: 'center',
          baseline: 'middle',
          position: 'inside',
        },

        emphasis: {
          itemStyle: {
            opacity: 0.8,
          },
        },
      },
    ],
  }
  mycharts.setOption(option)
})
</script>
<script lang="ts">
export default {
  name: 'Tourist',
}
</script>

<style scoped lang="scss">
.order-text {
  display: flex;
  width: 100%;
  color: #29fcff;
  justify-content: right;
  font-size: 14px;
  padding: 10px;

  .order-count {
    color: orange;
    font-style: italic;
  }
}

.people-count {
  display: flex;
  margin: 0 10px;
  .people-count-text {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    flex: 1;
    color: white;
    font-size: 30px;
    background: url('@/views/screen/images/total.png') no-repeat;
    background-size: 100% 100%;
  }
}

.proportional-ball {
  width: 100%;
  height: 270px;
}
</style>
