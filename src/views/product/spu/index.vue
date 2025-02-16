<template>
  <div>
    <Category />
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-button
        type="primary"
        size="default"
        @click="handleShowAddSPU"
        :disabled="!categoryStore.c3Id"
        v-show="contentScene === 0"
      >
        添加SPU
      </el-button>
      <el-table
        :data="spuDataList"
        border
        stripe
        style="margin: 20px 0"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        v-show="contentScene === 0"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80px"
        ></el-table-column>
        <el-table-column prop="spuName" label="SPU名称"></el-table-column>
        <el-table-column prop="description" label="SPU描述"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              title="添加SKU"
              type="success"
              size="default"
              icon="Plus"
              @click="handleShowAddSkuForm(scope)"
            ></el-button>
            <el-button
              title="编辑SPU"
              type="primary"
              size="default"
              icon="Edit"
              @click="handleShowEditSpuForm(scope)"
            ></el-button>
            <el-button
              title="SPU详情"
              type="warning"
              size="default"
              icon="InfoFilled"
              @click="handleShowSkuList(scope.row)"
            ></el-button>
            <el-popconfirm
              :title="`你确认要删除${scope.row.spuName}吗？`"
              @confirm="deleteSpuData(scope.row.id)"
            >
              <template #reference>
                <el-button
                  title="删除SPU"
                  type="danger"
                  size="default"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :page-sizes="[3, 5, 7, 9]"
          :page-size="pageSize"
          layout="prev, pager, next, jumper, -> , sizes, total"
          :total="totalNum"
          background
        >
          :pager-count="7">
        </el-pagination>
      </el-table>
      <SpuForm
        ref="spuFormRef"
        v-show="contentScene === 1"
        @changeScene="changeScene"
      />
      <SkuForm
        ref="skuFormRef"
        v-show="contentScene === 2"
        @changeScene="changeScene"
      />
    </el-card>
    <el-dialog
      title="SPU详情"
      v-model="spuDetailDialogVisible"
      @close="spuDetailDialogVisible = false"
    >
      <el-table :data="spuDetail" border stripe>
        <el-table-column prop="skuName" label="SKU名字"></el-table-column>
        <el-table-column prop="price" label="SKU价格(元)"></el-table-column>
        <el-table-column prop="weight" label="SKU重量(g)"></el-table-column>
        <el-table-column label="SKU图片">
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.skuDefaultImg"
            ></el-image>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getSkusBySpuId } from '@/api/product/sku'
import { SaveOrUpdateSkuData } from '@/api/product/sku/type'
import { deleteSpu, getSpuList } from '@/api/product/spu'
import { SpuData, SpuListData } from '@/api/product/spu/type'
import { ResponseData } from '@/api/type'
import Category from '@/components/Category/index.vue'
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
import { onBeforeUnmount, ref, watch } from 'vue'
import SkuForm from './skuForm.vue'
import SpuForm from './spuForm.vue'

const categoryStore = useCategoryStore()

onBeforeUnmount(() => {
  categoryStore.$reset()
})

let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let totalNum = ref<number>(0)
let spuDataList = ref<SpuData[]>([])
let contentScene = ref<number>(0)
let spuFormRef = ref()
let skuFormRef = ref()

const getSpuListData = async (c3Id: number | undefined) => {
  if (!c3Id) {
    return
  }
  let result: ResponseData<SpuListData> = await getSpuList(
    pageNo.value,
    pageSize.value,
    { category3Id: c3Id },
  )
  if (result.code === 200) {
    totalNum.value = result.data.total
    spuDataList.value = result.data.records
  } else {
    console.error('获取SPU列表失败')
    ElMessage.error('获取SPU列表失败')
  }
}

watch(
  () => categoryStore.c3Id,
  async (newVal) => {
    if (!newVal) {
      spuDataList.value = []
      return
    }
    getSpuListData(newVal)
  },
)

const handleShowAddSPU = () => {
  spuFormRef.value.initAddSpuParams(categoryStore.c3Id)
  contentScene.value = 1
}

const sizeChange = (val: number) => {
  pageSize.value = val
  getSpuListData(categoryStore.c3Id)
}

const currentChange = (val: number) => {
  pageNo.value = val
  getSpuListData(categoryStore.c3Id)
}

const deleteSpuData = async (id: number) => {
  let result: ResponseData = await deleteSpu(id)
  if (result.code === 200) {
    ElMessage.success('删除SPU成功')
    getSpuListData(categoryStore.c3Id)
  } else {
    ElMessage.error('删除SPU失败')
  }
}

const handleShowAddSkuForm = (scope: { row: SpuData }) => {
  skuFormRef.value.initAddData(scope.row)
  contentScene.value = 2
}

const handleShowEditSpuForm = (scope: { row: SpuData }) => {
  spuFormRef.value.initUpdateSpuParams(scope.row)
  contentScene.value = 1
}

let spuDetail = ref<SaveOrUpdateSkuData[]>([])
let spuDetailDialogVisible = ref<boolean>(false)
const handleShowSkuList = async (row: SpuData) => {
  let result: ResponseData<SaveOrUpdateSkuData[]> = await getSkusBySpuId(row.id)
  if (result.code === 200) {
    spuDetail.value = result.data
    spuDetailDialogVisible.value = true
  } else {
    ElMessage.error('获取SPU详情失败')
  }
}

const changeScene = (scene: number) => {
  contentScene.value = scene
  getSpuListData(categoryStore.c3Id)
}
</script>

<style scoped lang="scss"></style>
