<template>
  <el-card>
    <el-form ref="formRef" :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          placeholder="请选择"
          @change="handleChangeCategory1"
        >
          <el-option
            v-for="item in categoryStore.c1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          placeholder="请选择"
          @change="handleChangeCategory2"
        >
          <el-option
            v-for="item in categoryStore.c2Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.c3Id"
          placeholder="请选择"
          @change="handleChangeCategory3"
        >
          <el-option
            v-for="item in categoryStore.c3Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

const getCategory1List = () => {
  categoryStore.getCategory1List()
}

onMounted(() => {
  getCategory1List()
})

const handleChangeCategory1 = (val: number) => {
  categoryStore.c1Id = val
  categoryStore.c2Id = undefined
  categoryStore.c3Id = undefined
  categoryStore.c3Arr = []
  categoryStore.getCategory2List()
}

const handleChangeCategory2 = (val: number) => {
  categoryStore.c2Id = val
  categoryStore.c3Id = undefined
  categoryStore.getCategory3List()
}

const handleChangeCategory3 = (val: number) => {
  categoryStore.c3Id = val
}
</script>

<style scoped lang="scss">
.el-select {
  width: 240px;
}
</style>
