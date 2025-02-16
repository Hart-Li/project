<template>
  <div>
    <el-card shadow="always">
      <el-table :data="skuList" border stripe>
        <el-table-column
          type="index"
          label="序号"
          width="80px"
        ></el-table-column>
        <el-table-column
          prop="skuName"
          label="名称"
          width="200px"
        ></el-table-column>
        <el-table-column
          prop="skuDesc"
          label="描述"
          width="200px"
        ></el-table-column>
        <el-table-column label="图片" width="200px">
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.skuDefaultImg"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="weight"
          label="重量（g）"
          width="200px"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="价格（元）"
          width="200px"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="260px">
          <template #default="scope">
            <el-button
              type="success"
              size="default"
              :icon="scope.row.isSale === 1 ? 'Top' : 'Bottom'"
              @click="onOrCancelSale(scope.row)"
            ></el-button>
            <el-button
              type="primary"
              size="default"
              icon="Edit"
              @click="editSku"
            ></el-button>
            <el-button
              type="info"
              size="default"
              icon="InfoFilled"
              @click="showSkuDetail(scope.row.id)"
            ></el-button>
            <el-popconfirm
              title="确定删除该商品吗？"
              @confirm="deleteSku(scope.row.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="default"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="totalNum"
        background
      >
        :pager-count="7">
      </el-pagination>
    </el-card>
    <el-drawer
      title="查看商品详情"
      v-model="skuDetailDrawerVisible"
      :destroy-on-close="true"
      :show-close="true"
      :wrapperClosable="true"
    >
      <el-row style="margin-bottom: 10px">
        <el-col :span="6">名称</el-col>
        <el-col :span="18">{{ skuDetailData?.skuName }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="6">描述</el-col>
        <el-col :span="18">{{ skuDetailData?.skuDesc }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="6">价格（元）</el-col>
        <el-col :span="18">{{ skuDetailData?.price }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="6">重量（g）</el-col>
        <el-col :span="18">{{ skuDetailData?.weight }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="6">平台属性</el-col>
        <el-col :span="18">
          <el-tag
            v-for="item in skuDetailData?.skuAttrValueList"
            :key="item.id"
            style="margin-right: 10px"
          >
            {{ item.valueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px">
        <el-col :span="6">销售属性</el-col>
        <el-col :span="18">
          <el-tag
            v-for="item in skuDetailData?.skuSaleAttrValueList"
            :key="item.id"
            style="margin-right: 10px"
          >
            {{ item.saleAttrValueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">商品图片</el-col>
        <el-col :span="18">
          <el-carousel
            height="150px"
            type="card"
            direction="horizontal"
            :initial-index="0"
            :autoplay="true"
            :interval="3000"
            :loop="true"
            trigger="hover"
            indicator-position="outside"
            arrow="hover"
          >
            <el-carousel-item
              v-for="(skuImage, index) in skuDetailData?.skuImageList"
              :key="index"
            >
              <el-image
                style="width: 100px; height: 100px"
                :src="skuImage.imgUrl"
                fit="cover"
              ></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  cancelSaleSku,
  deleteSkuInfo,
  getSkuInfoById,
  getSkus,
  onSaleSku,
} from '@/api/product/sku'
import { SaveOrUpdateSkuData, SkuListData } from '@/api/product/sku/type'
import { ResponseData } from '@/api/type'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'

const skuList = ref<SaveOrUpdateSkuData[]>([])
const totalNum = ref<number>(0)
const pageSize = ref<number>(10)
const pageNo = ref<number>(1)
let skuDetailDrawerVisible = ref<boolean>(false)
let skuDetailData = ref<SaveOrUpdateSkuData>()

// 获取sku列表
const getSkuList = async () => {
  const result: ResponseData<SkuListData> = await getSkus(
    pageNo.value,
    pageSize.value,
  )
  if (result.code === 200) {
    skuList.value = result.data.records
    totalNum.value = result.data.total
  } else {
    ElMessage.error('获取sku列表失败')
  }
}

onMounted(() => {
  getSkuList()
})

const sizeChange = (val: number) => {
  pageSize.value = val
  getSkuList()
}

const currentChange = (val: number) => {
  pageNo.value = val
  getSkuList()
}

const onOrCancelSale = async (row: SaveOrUpdateSkuData) => {
  if (row.isSale === 1) {
    // 下架
    let result: ResponseData = await cancelSaleSku(row.id!)
    if (result.code === 200) {
      ElMessage.success('下架成功')
      getSkuList()
    } else {
      ElMessage.error('下架失败')
    }
  } else {
    // 上架
    let result: ResponseData = await onSaleSku(row.id!)
    if (result.code === 200) {
      ElMessage.success('上架成功')
      getSkuList()
    } else {
      ElMessage.error('上架失败')
    }
  }
}

const editSku = () => {
  ElMessage.success('该功能正在加紧开发中...')
}

const showSkuDetail = async (id: number) => {
  skuDetailDrawerVisible.value = true
  let result: ResponseData<SaveOrUpdateSkuData> = await getSkuInfoById(id)
  if (result.code === 200) {
    skuDetailData.value = result.data
  } else {
    ElMessage.error('获取sku详情失败')
  }
}

const deleteSku = async (id: number) => {
  let result: ResponseData = await deleteSkuInfo(id)
  if (result.code === 200) {
    ElMessage.success('删除成功')
    getSkuList()
  } else {
    ElMessage.error('删除失败')
  }
}
</script>

<style scoped lang="scss"></style>
