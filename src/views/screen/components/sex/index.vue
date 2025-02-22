<template>
  <BasePart :top-title="topTitle">
    <template v-slot:main>
      <div class="top">
        <div class="sex-common man">
          <div class="text">男士</div>
          <img class="img" src="@/views/screen/images/man.png" />
        </div>
        <div class="sex-common woman">
          <div class="text">女士</div>
          <img class="img" src="@/views/screen/images/woman.png" />
        </div>
      </div>
      <div class="proportion">
        <div class="man-text">男士60%</div>
        <div class="woman-text">女士40%</div>
      </div>
      <div class="charts" ref="charts"></div>
    </template>
  </BasePart>
</template>

<script setup lang="ts">
import BasePart from '@/components/BasePart/index.vue'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let topTitle = '性别分布'
let charts = ref()

onMounted(() => {
  const myChart = echarts.init(charts.value)
  const option = {
    xAxis: [
      {
        show: false,
        min: 0,
        max: 100,
      },
    ],
    yAxis: [
      {
        show: false,
        type: 'category',
      },
    ],
    series: [
      {
        type: 'bar',
        data: [60],
        barWidth: 20,
        z: 10,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 50,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 50,
        },
      },
    ],
  }
  myChart.setOption(option)
})
</script>
<script lang="ts">
export default {
  name: 'Sex',
}
</script>

<style scoped lang="scss">
.top {
  display: flex;
  justify-content: center;
  margin-top: 60px;

  .sex-common {
    width: 111px;
    height: 116px;
    display: flex;
    margin: 20px;
    flex-direction: column;
    align-items: center;
    color: white;

    .img {
      margin-top: 20px;
    }
  }

  .man {
    margin-right: 50px;
    background: url('@/views/screen/images/man-bg.png') no-repeat;
  }

  .woman {
    margin-left: 50px;
    background: url('@/views/screen/images/woman-bg.png') no-repeat;
  }
}

.proportion {
  display: flex;
  justify-content: center;
  color: white;

  .man-text {
    margin-right: 110px;
  }

  .woman-text {
    margin-left: 110px;
  }
}

.charts {
  margin-top: 5px;
  width: 100%;
  height: 30px;
}
</style>
