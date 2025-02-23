<template>
  <BasePart :topTitle="topTitle">
    <template #main>
      <div class="charts" ref="charts"></div>
    </template>
  </BasePart>
</template>

<script setup lang="ts">
import BasePart from '@/components/BasePart/index.vue'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let charts = ref()
let topTitle = '年度游客量对比'

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  // 多条折线图,2021年,2022年,2023年,2024年年度游客量对比的折线图
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['2021年', '2022年', '2023年', '2024年'],
      textStyle: {
        color: 'white',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#fff',
        },
      },
      axisTick: {
        show: true,
        inside: true,
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: '2021年',
        type: 'line',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210, 220, 182, 191, 234, 290],
        smooth: true,
        areaStyle: {
          show: true,
          opacity: 0.3,
        },
      },
      {
        name: '2022年',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290],
        smooth: true,
        areaStyle: {
          show: true,
          opacity: 0.3,
        },
      },
      {
        name: '2023年',
        type: 'line',
        stack: '总量',
        data: [150, 232, 201, 154, 190, 330, 410, 220, 182, 191, 234, 290],
        smooth: true,
        areaStyle: {
          show: true,
          opacity: 0.3,
        },
      },
      {
        name: '2024年',
        type: 'line',
        stack: '总量',
        data: [320, 332, 301, 334, 390, 330, 320, 220, 182, 191, 234, 290],
        smooth: true,
        areaStyle: {
          show: true,
          opacity: 0.3,
        },
      },
    ],
  }
  myCharts.setOption(option)
})
</script>

<style scoped lang="scss">
.charts {
  margin-top: 40px;
  height: calc(100% - 40px);
}
</style>
