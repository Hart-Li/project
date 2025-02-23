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
let topTitle = '预约渠道数据统计'

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  // 绘制智慧文旅平台、携程、飞猪、其他渠道的占比的饼图
  const option = {
    title: {
      text: '预约渠道数据统计',
      left: 'center',
      top: 20,
      textStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'normal',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 10,
      top: 50,
      data: ['智慧文旅平台', '携程', '飞猪', '其他渠道'],
      textStyle: {
        color: 'white',
      },
    },
    series: [
      {
        name: '预约渠道数据统计',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 335, name: '智慧文旅平台' },
          { value: 310, name: '携程' },
          { value: 234, name: '飞猪' },
          { value: 135, name: '其他渠道' },
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
  myCharts.setOption(option)
})
</script>

<style scoped lang="scss">
.charts {
  height: calc(100% - 40px);
}
</style>
