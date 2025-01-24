<template>
  <!-- svg:图标外层容器节点，内部需要与 use 标签结合使用 -->
  <svg :style="{ width, height }">
    <!-- xlink:href 执行用哪一个图标，属性的值必须为 #icon-图标名称 -->
    <!-- use 标签的 fill 属性设置图标颜色，若是此处颜色不生效，可以排查 svg 文件中本身是不是携带 fill 属性 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '100px',
  },
  height: {
    type: String,
    default: '100px',
  },
})
</script>

<style scoped></style>
