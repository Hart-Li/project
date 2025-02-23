<template>
  <BasePart :topTitle="topTitle">
    <template #main>
      <div class="top">
        <div class="rank-title">排名</div>
        <div class="area-title">景区名称</div>
        <div class="chart-title">预约数量</div>
      </div>
      <div class="content-container">
        <div class="content" v-for="(item, index) in contents" :key="index">
          <SvgIcon
            class="rank-icon"
            :name="item.iconName!"
            width="40px"
            height="20px"
          />
          <div class="area-text">{{ item.area }}</div>
          <div class="charts" :ref="`charts-${index}`"></div>
        </div>
      </div>
    </template>
  </BasePart>
</template>

<script setup lang="ts">
import BasePart from '@/components/BasePart/index.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import * as echarts from 'echarts'
import { getCurrentInstance, onMounted, ref } from 'vue'

let contents = ref([
  {
    iconName: 'mark_no1',
    area: '峨眉山',
    data: [80000],
    color: 'blue',
  },
  {
    iconName: 'mark_no2',
    area: '稻城亚丁',
    data: [60000],
    color: 'pink',
  },
  {
    iconName: 'mark_no3',
    area: '九寨沟',
    data: [50000],
    color: 'skyblue',
  },
  {
    iconName: 'mark_no4',
    area: '万里长城',
    data: [40000],
    color: 'orange',
  },
  {
    iconName: 'mark_no5',
    area: '北京故宫',
    data: [30000],
    color: 'purple',
  },
])
let topTitle = '热门景区排行'

onMounted(() => {
  const refs = getCurrentInstance()?.refs

  contents.value.forEach((content, index) => {
    const chartRefs = (refs as any)[`charts-${index}`]
    if (chartRefs && chartRefs.length > 0) {
      const chartRef = echarts.init(chartRefs[0])
      const option = {
        xAxis: [
          {
            show: false,
            min: 0,
            max: 100000,
          },
        ],
        yAxis: [
          {
            show: false,
            type: 'category',
          },
        ],
        series: {
          type: 'bar',
          data: content.data,
          barWidth: 20,
          itemStyle: {
            color: content.color,
            borderRadius: 20,
          },
          label: {
            show: true,
            position: 'right',
            color: 'white',
            formatter: () => {
              let number = (content.data[0] / 10000).toFixed(2)
              return number + '万'
            },
          },
        },
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      }
      chartRef.setOption(option)
    }
  })
})
</script>

<style scoped lang="scss">
.top {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  color: orange;
  background: url('@/views/screen/images/rankingChart-bg.png') no-repeat;
  background-size: 100% 100%;
  height: 30px;
  align-items: center;

  .rank-title {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .area-title {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .chart-title {
    flex: 4;
    display: flex;
    justify-content: center;
  }
}

.content-container {
  margin-top: 15px;
  .content {
    display: flex;
    flex-direction: row;
    margin-top: 25px;

    .rank-icon {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    .area-text {
      flex: 1;
      display: flex;
      justify-content: center;
      color: orange;
    }

    .charts {
      flex: 4;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
