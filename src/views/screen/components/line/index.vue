<template>
  <div class="box">
    <div class="top">
      <div class="title">未来七天游客数量趋势图</div>
      <img src="@/views/screen/images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let charts = ref()

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  // 绘制折线图
  let option = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      axisTick: {
        show: true,
        inside: true,
      },
      boundaryGap: false,
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
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210],
        smooth: true,
        itemStyle: {
          normal: {
            color: '#fff',
          },
        },
        lineStyle: {
          color: '#fff',
        },
        areaStyle: {
          show: true,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'red', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'blue', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  }
  myCharts.setOption(option)
})
</script>

<style scoped lang="scss">
.box {
  background: url('@/views/screen/images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

  .title {
    color: white;
    font-size: 20px;
    margin-top: 10px;
  }

  .charts {
    height: 100%;
  }
}
</style>
