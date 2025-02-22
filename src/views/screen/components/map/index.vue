<template>
  <div class="box">
    <div class="top">
      <div class="title">平台高峰预警信息(2条)</div>
    </div>
    <div class="map">
      <div class="title"><span class="title-text">景区实时客流量</span></div>
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import chinaJson from '@/views/screen/components/map/china.json'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let charts = ref()
echarts.registerMap('china', chinaJson as any)
onMounted(() => {
  let myChart = echarts.init(charts.value)
  myChart.setOption({
    geo: {
      roam: true, // 通过鼠标进行缩放
      map: 'china',
      label: {
        show: true,
        color: '#fff',
      },
      zoom: 1.5,
      top: 150,
      itemStyle: {
        areaColor: {
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
        borderColor: '#0A1F2D',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 18,
        },
      },
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [87.617733, 43.792818], // 起点
              [104.065735, 30.659462],
            ],
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'pink', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'white', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              curveness: 0.3,
              width: 3,
            },
          },
          {
            coords: [
              [104.065735, 30.659462],
              [87.617733, 43.792818],
            ],
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'pink', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'white', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              curveness: 0.3,
              width: 3,
            },
          },
          {
            coords: [
              [116.405285, 39.904989],
              [113.280637, 23.125178],
            ],
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'pink', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'white', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              curveness: 0.3,
              width: 3,
            },
          },
          {
            coords: [
              [113.280637, 23.125178],
              [116.405285, 39.904989],
            ],
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'pink', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'white', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              curveness: 0.3,
              width: 3,
            },
          },
        ],
        effect: {
          show: true,
          period: 6,
          color: 'white',
          symbol:
            'path://M512 59c61.24 0 111 49.17 111.98 110.2l0.02 1.85v227.19L952.28 596.7c4.69 2.83 7.59 7.87 7.72 13.33V738.51c0 0.81-0.12 1.62-0.37 2.39-1.29 4.14-5.64 6.47-9.78 5.32l-0.24-0.07L624 644.21v161.23l74.32 70.25c3.1 2.93 4.9 6.97 5 11.23V974.63c0 0.69-0.09 1.37-0.26 2.03-1.1 4.19-5.33 6.73-9.52 5.76l-0.25-0.06-177.23-46.6c-2.51-0.66-5.14-0.7-7.67-0.12l-0.47 0.12-177.23 46.6a8.2 8.2 0 0 1-2.03 0.27c-4.33 0-7.86-3.45-8-7.75v-87.56c0-4.27 1.7-8.35 4.72-11.35l0.29-0.28L400 805.44V644.21L74.39 746.16c-0.77 0.24-1.58 0.37-2.39 0.37-4.33 0-7.86-3.45-8-7.75V610.4c0-5.48 2.8-10.57 7.41-13.5l0.31-0.19L400 398.25V171.06c0-60.66 48.17-110.06 108.32-112l1.83-0.04L512 59z m0.08 64l-1 0.01-0.67 0.02c-25.52 0.82-45.99 21.62-46.4 47.25l-0.01 0.79v263.29L128 637.47v24.84l336-105.2v275.9l-70.54 66.68 98.2-25.82a80 80 0 0 1 39.9-0.2l0.79 0.2 98.2 25.82L560 833.01v-275.9l336 105.2v-24.84L560 434.34V171.06c0-26.28-21.07-47.63-47.21-48.06h-0.71z',
          symbolSize: 20,
        },
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.box {
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  .top {
    height: 64px;
    background: url('@/views/screen/images/dataScreen-header-warn-bg.png')
      no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    color: white;
  }

  .map {
    height: calc(100% - 64px);

    .title {
      width: 300px;
      height: 30px;
      background: url('@/views/screen/images/map-title-bg.png') no-repeat;
      background-size: cover;
      display: flex;
      align-items: center;
      color: white;
      .title-text {
        margin-left: 40px;
      }
    }

    .charts {
      width: 100%;
      height: calc(100% - 30px);
    }
  }
}
</style>
