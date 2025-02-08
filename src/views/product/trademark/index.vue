<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!-- 表格组件：用于展示已经添加的数据 -->
    <el-table
      :data="tableData"
      style="margin: 10px 0"
      :cell-style="{ textAlign: 'center' }"
      border
    >
      <el-table-column label="序号" type="index" width="60px"></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌Logo"></el-table-column>
      <el-table-column label="品牌操作"></el-table-column>
    </el-table>
    <!-- 分页组件：用于分页展示数据 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 5, 7, 9]"
      background="true"
      :page-size="pageSize"
      layout="prev, pager, next, jumper, -> ,sizes, total"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getTrademarkList } from '@/api/product/trademark'

let currentPage = ref(1)
let limit = ref(3)
let total = ref(0)
let tableData = ref([])

const getTrademarkListData = async () => {
  const res = await getTrademarkList(currentPage.value, limit.value)
  console.log(res)
  total.value = res.data.total
  tableData.value = res.data.records
}

onMounted(() => {
  getTrademarkListData()
})
</script>

<style scoped lang="scss">
.box-card {
  margin: 20px;
}
</style>
