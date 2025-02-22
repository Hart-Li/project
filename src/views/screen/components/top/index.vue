<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="middle">
      <span class="title">智慧旅游可视化大数据平台</span>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间:{{ currentTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

let currentTime = ref(moment().format('YYYY-MM-DD HH:mm:ss'))
const router = useRouter()
let timer = ref()

onMounted(() => {
  timer.value = setInterval(() => {
    currentTime.value = moment().format('YYYY-MM-DD HH:mm:ss')
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})

const goHome = () => {
  router.push('/home')
}
</script>
<script lang="ts">
export default {
  name: 'Top',
}
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;

  display: flex;

  .left {
    flex: 1.5;
    background: url('@/views/screen/images/dataScreen-header-left-bg.png')
      no-repeat;
    background-size: cover;

    .lbtn {
      background: url('@/views/screen/images/dataScreen-header-btn-bg-l.png')
        no-repeat;
      background-size: 100% 100%;
      float: right;
      width: 135px;
      height: 42px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      color: #29fcff;
    }
  }

  .middle {
    flex: 2;

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      color: #29fcff;
      width: 793px;
      height: 74px;
      background: url('@/views/screen/images/dataScreen-header-center-bg.png')
        no-repeat;
      background-size: 100% 100%;
    }
  }

  .right {
    flex: 1.5;
    display: flex;
    justify-content: space-between;
    background: url('@/views/screen/images/dataScreen-header-right-bg.png')
      no-repeat;
    background-size: cover;

    .rbtn {
      background: url('@/views/screen/images/dataScreen-header-btn-bg-r.png')
        no-repeat;
      background-size: 100% 100%;
      width: 135px;
      height: 42px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      color: #29fcff;
    }
    .time {
      color: #29fcff;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>
