<template>
  <div class="box">
    <div class="top">
      <span class="title">{{ topTitle }}</span>
      <img
        class="title-bg"
        src="@/views/screen/images/dataScreen-title.png"
        alt=""
      />
      <slot name="top-other"></slot>
    </div>
    <div class="main">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  topTitle: {
    type: String,
    default: '',
  },
})
</script>
<script lang="ts">
export default {
  name: 'BasePart',
}
</script>

<style scoped lang="scss">
.box {
  background: url('@/views/screen/images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin: 10px 10px 0 10px;

  .top {
    width: 100%;
    display: flex;
    flex-direction: column;
    .title {
      color: white;
      font-size: 24px;
    }

    .title-bg {
      width: 68px;
      height: 7px;
      margin-top: 10px;
    }
  }

  .main {
    width: 100%;
    height: 100%;
  }
}
</style>
