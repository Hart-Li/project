<template>
  <div>
    <Category />
    <el-card>
      <el-button
        type="primary"
        icon="Plus"
        :disabled="categoryStore.c3Id === undefined"
      >
        添加品牌属性
      </el-button>
      <el-table
        :data="attrList"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        border
        style="margin: 10px 0"
      >
        <el-table-column prop="id" label="序号" width="80px" />
        <el-table-column prop="attrName" label="属性名称" width="120px" />
        <el-table-column prop="attrValueList" label="属性值名称">
          <template #default="scope">
            <el-tag
              v-for="item in scope.row.attrValueList"
              :key="item.id"
              style="margin-right: 10px"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="200px">
          <template #default="scope">
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="handleShowUpdateDialog"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="deleteProductAttr"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getAttrInfoList } from '@/api/product/attr'
import { ProductAttrData } from '@/api/product/attr/type'
import { ResponseData } from '@/api/type'
import Category from '@/components/Category/index.vue'

import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'

const categoryStore = useCategoryStore()

let attrList = ref<ProductAttrData[]>([])

watch(
  () => categoryStore.c3Id,
  async (val) => {
    attrList.value = []
    if (val === undefined) {
      return
    }
    const result: ResponseData<ProductAttrData[]> = await getAttrInfoList(
      categoryStore.c1Id!,
      categoryStore.c2Id!,
      val,
    )
    if (result.code === 200) {
      attrList.value = result.data
    } else {
      ElMessage.error(result.message)
    }
  },
)
</script>

<style scoped lang="scss"></style>
