<template>
  <div>
    <Category />
    <el-card>
      <el-button
        type="primary"
        icon="Plus"
        :disabled="categoryStore.c3Id === undefined"
        @click="handleShowAddCard"
      >
        添加品牌属性
      </el-button>
      <div v-show="!isShowAddAttrCard">
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
                @click="handleShowUpdateCard(scope.row)"
              >
                编辑
              </el-button>
              <el-popconfirm
                title="你确定要删除吗？"
                @confirm="deleteProductAttr(scope.row.id)"
              >
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete">
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="isShowAddAttrCard">
        <el-form
          ref="addAttrFormRef"
          :model="addAttrParams"
          style="margin: 20px 0"
        >
          <el-form-item label="属性名称" prop="name">
            <el-input
              v-model="addAttrParams.attrName"
              placeholder="请输入属性名称"
            />
          </el-form-item>
          <el-button
            type="primary"
            icon="Plus"
            :disabled="addAttrParams.attrName.trim().length === 0"
            @click="addTempProductAttr"
          >
            添加属性值
          </el-button>
          <el-button type="primary" @click="cancelAddAttr">取消</el-button>
          <el-table
            border
            style="margin: 20px 0"
            :data="addAttrParams.attrValueList"
          >
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column label="属性值名称">
              <template #default="scope">
                <el-input
                  v-show="scope.row.isEdit"
                  v-model="scope.row.valueName"
                  @blur="handleAttrValueNotEdit(scope.$index)"
                  :ref="addAttrValueInput"
                />
                <div
                  v-show="!scope.row.isEdit"
                  @click="handleAttrValueEdit(scope.$index)"
                >
                  {{ scope.row.valueName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160px">
              <template #default="scope">
                <el-button
                  type="danger"
                  icon="Delete"
                  @click="handleDeleteAttr(scope.$index)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="primary"
            @click="saveAttr"
            :disabled="addAttrParams.attrValueList.length === 0"
          >
            保存
          </el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  deleteAttrInfo,
  getAttrInfoList,
  saveAttrInfo,
} from '@/api/product/attr'
import { ProductAttrData } from '@/api/product/attr/type'
import { ResponseData } from '@/api/type'
import Category from '@/components/Category/index.vue'

import useCategoryStore from '@/store/modules/category'
import { ElMessage, FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash'
import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'

const categoryStore = useCategoryStore()

let attrList = ref<ProductAttrData[]>([])
let isShowAddAttrCard = ref(false)
let addAttrFormRef = ref<FormInstance>()

const addAttrParams = reactive<ProductAttrData>({
  id: undefined,
  attrName: '',
  categoryId: undefined,
  categoryLevel: undefined,
  attrValueList: [],
})

const setInitAttrParams = () => {
  addAttrParams.id = undefined
  addAttrParams.attrName = ''
  addAttrParams.categoryId = undefined
  addAttrParams.categoryLevel = undefined
  addAttrParams.attrValueList = []
}

const getAttrList = async (c1Id: number, c2Id: number, c3Id: number) => {
  const result: ResponseData<ProductAttrData[]> = await getAttrInfoList(
    c1Id,
    c2Id,
    c3Id,
  )
  if (result.code === 200) {
    attrList.value = result.data
  } else {
    ElMessage.error(result.message)
  }
}

watch(
  () => categoryStore.c3Id,
  async (val) => {
    attrList.value = []
    isShowAddAttrCard.value = false
    if (val === undefined) {
      return
    }
    getAttrList(categoryStore.c1Id!, categoryStore.c2Id!, val)
  },
)

onBeforeUnmount(() => {
  categoryStore.$reset()
})

const handleShowAddCard = () => {
  setInitAttrParams()
  isShowAddAttrCard.value = true
  Object.assign(addAttrParams, {
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  })
}

const handleShowUpdateCard = (row: ProductAttrData) => {
  setInitAttrParams()
  isShowAddAttrCard.value = true

  Object.assign(addAttrParams, cloneDeep(row))
  // addAttrParams.id = row.id
  // addAttrParams.attrName = row.attrName
  // addAttrParams.categoryId = row.categoryId
  // addAttrParams.categoryLevel = row.categoryLevel
  // addAttrParams.attrValueList = _.deepClone(row.attrValueList)
}

const deleteProductAttr = async (id: number) => {
  await deleteAttrInfo(id).then((res) => {
    if (res.code === 200) {
      ElMessage.success(res.message)
      getAttrList(categoryStore.c1Id!, categoryStore.c2Id!, categoryStore.c3Id!)
    } else {
      ElMessage.error(res.message)
    }
  })
}

const cancelAddAttr = () => {
  isShowAddAttrCard.value = false
}

const addTempProductAttr = () => {
  addAttrParams.attrValueList.push({
    id: undefined,
    valueName: '',
    attrId: addAttrParams.id,
    isEdit: true,
  })
}

const handleDeleteAttr = (index: number) => {
  addAttrParams.attrValueList.splice(index, 1)
}

const saveAttr = async () => {
  if (addAttrParams.attrName.trim().length === 0) {
    ElMessage.error('属性名称不能为空')
    return
  }
  for (let i = 0; i < addAttrParams.attrValueList.length; i++) {
    if (addAttrParams.attrValueList[i].valueName.trim().length === 0) {
      ElMessage.error('第' + (i + 1) + '行属性值不能为空')
      return
    }
  }
  await saveAttrInfo(addAttrParams).then((res) => {
    if (res.code === 200) {
      ElMessage.success('保存成功')
      getAttrList(categoryStore.c1Id!, categoryStore.c2Id!, categoryStore.c3Id!)
      isShowAddAttrCard.value = false
    } else {
      ElMessage.error(res.message)
    }
  })
}

const handleAttrValueNotEdit = (index: number) => {
  if (addAttrParams.attrValueList[index].valueName.trim().length === 0) {
    ElMessage.error('属性值不能为空')
    return
  }
  addAttrParams.attrValueList[index].isEdit = false
}

const handleAttrValueEdit = (index: number) => {
  addAttrParams.attrValueList[index].isEdit = true
}

const addAttrValueInput = (element: any) => {
  nextTick(() => {
    element.focus()
  })
}
</script>

<style scoped lang="scss"></style>
