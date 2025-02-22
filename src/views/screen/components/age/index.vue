<template>
  <BasePart :topTitle="topTitle">
    <template v-slot:main>
      <div class="charts" ref="charts"></div>
    </template>
  </BasePart>
</template>

<script setup lang="ts">
import BasePart from '@/components/BasePart/index.vue'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let topTitle = '年龄比例'
let charts = ref()

onMounted(() => {
  const chart = echarts.init(charts.value)
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      right: 30,
      top: 40,
      textStyle: {
        color: 'white',
        fontSize: 12,
      },
      data: [
        '10岁以下',
        '10-18岁',
        '18-30岁',
        '30-40岁',
        '40-60岁',
        '60岁以上',
      ],
    },
    series: [
      {
        name: '本日总数',
        type: 'pie',
        radius: ['40%', '60%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 16, name: '10岁以下' },
          { value: 8, name: '10-18岁' },
          { value: 12, name: '18-30岁' },
          { value: 24, name: '30-40岁' },
          { value: 20, name: '40-60岁' },
          { value: 20, name: '60岁以上' },
        ],
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  }
  chart.setOption(option)
})
</script>
<script lang="ts">
export default {
  name: 'Age',
}
</script>

<style scoped lang="scss">
.charts {
  width: 100%;
  height: 240px;
}
</style>
