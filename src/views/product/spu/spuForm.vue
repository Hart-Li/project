<template>
  <div style="padding: 20px">
    <el-form
      ref="addOrUpdateSpuFormRef"
      :model="addOrUpdateSpuFormParams"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="SPU名称" prop="spuName">
        <el-input v-model="addOrUpdateSpuFormParams.spuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌" prop="tmId">
        <el-select v-model="addOrUpdateSpuFormParams.tmId" clearable filterable>
          <el-option
            v-for="item in allTrademarkList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述" prop="description">
        <el-input
          type="textarea"
          v-model="addOrUpdateSpuFormParams.description"
          :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片" prop="spuImageList">
        <el-upload
          v-model:file-list="spuImageList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img
            w-full
            :src="dialogImageUrl"
            alt="Preview Image"
            style="width: 100%; height: 100%"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性" prop="spuSaleAttrList">
        <el-select
          v-model="selectedSaleAttr"
          clearable
          filterable
          style="width: 240px; margin-right: 10px"
          :placeholder="`还有${noSelectSaleAttrList.length}个销售属性可选`"
        >
          <el-option
            v-for="item in noSelectSaleAttrList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          size="default"
          @click="addSpuAttr"
          :disabled="!selectedSaleAttr"
          icon="Plus"
        >
          添加销售属性
        </el-button>
        <el-table
          :data="addOrUpdateSpuFormParams.spuSaleAttrList"
          border
          stripe
          style="margin: 10px 0"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
          ></el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="销售属性名字"
            width="120px"
          ></el-table-column>
          <el-table-column label="销售属性值">
            <template #default="scope">
              <el-tag
                v-for="(item, index) in scope.row.spuSaleAttrValueList"
                :key="item.id"
                size="small"
                effect="dark"
                closable
                @close="deleteSpuAttrValue(scope.$index, index)"
                style="margin: 0 5px"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                :ref="attrValueInputRef"
                v-model="toAddAttrValueData"
                placeholder="请填写属性值"
                size="small"
                clearable
                v-show="scope.row.showAddBtn"
                @blur="addAttrValueData(scope.$index)"
                style="width: 100px"
              ></el-input>
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                @click="showAddBtn(scope.$index)"
                v-show="!scope.row.showAddBtn"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80px">
            <template #default="scope">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="deleteSpuAttr(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveSpu">保存</el-button>
        <el-button @click="cancelAddOrUpdateSpu">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {
  getSpuAllSaleAttr,
  getSpuImages,
  getSpuSaleAttr,
  saveOrUpdateSpuData,
} from '@/api/product/spu'
import {
  SaveOrUpdateSpuDataParams,
  SpuImageData,
  SpuSaleAttrData,
  SpuSaleAttrList,
} from '@/api/product/spu/type'
import { getAllTradeMarkList } from '@/api/product/trademark'
import { TradeMark } from '@/api/product/trademark/type'
import { ResponseData } from '@/api/type'
import {
  ElMessage,
  UploadFile,
  UploadRawFile,
  UploadUserFile,
} from 'element-plus'
import { computed, nextTick, onMounted, ref } from 'vue'

let $emit = defineEmits(['changeScene'])

const initAddOrUpdateSpuFormParams = (): SaveOrUpdateSpuDataParams => {
  return {
    category3Id: undefined,
    description: '',
    id: undefined,
    spuImageList: [],
    spuName: '',
    spuSaleAttrList: [],
    tmId: undefined,
  }
}

let addOrUpdateSpuFormParams = ref<SaveOrUpdateSpuDataParams>(
  initAddOrUpdateSpuFormParams(),
)
const addOrUpdateSpuFormRef = ref()
let allTrademarkList = ref<TradeMark[]>([])
let allSaleAttrList = ref<SpuSaleAttrData[]>([])

let dialogImageUrl = ref<string | undefined>('')
let dialogVisible = ref<boolean>(false)

let spuImageList = ref<UploadUserFile[]>([])
let selectedSaleAttr = ref<number>()
let toAddAttrValueData = ref<string>('')

onMounted(async () => {
  // 获取所有的品牌信息
  let allTrademarkListResult: ResponseData<TradeMark[]> =
    await getAllTradeMarkList()
  if (allTrademarkListResult.code === 200) {
    allTrademarkList.value = allTrademarkListResult.data
  } else {
    ElMessage.error('获取所有的品牌信息失败')
  }
  // 获取所有的销售属性信息
  let allSaleAttrListResult: ResponseData<SpuSaleAttrData[]> =
    await getSpuAllSaleAttr()
  if (allSaleAttrListResult.code === 200) {
    allSaleAttrList.value = allSaleAttrListResult.data
  } else {
    ElMessage.error('获取所有的销售属性信息失败')
  }
})

const initAddSpuParams = (category3Id: number) => {
  addOrUpdateSpuFormParams.value.category3Id = category3Id
  spuImageList.value = []
}

const initUpdateSpuParams = async (row: SaveOrUpdateSpuDataParams) => {
  // 初始值赋值
  addOrUpdateSpuFormParams.value = row
  // 获取图片列表
  let spuImageListResult: ResponseData<SpuImageData[]> = await getSpuImages(
    addOrUpdateSpuFormParams.value.id!,
  )
  if (spuImageListResult.code === 200) {
    spuImageList.value = spuImageListResult.data.map((item) => {
      return {
        name: item.imgName,
        url: item.imgUrl,
      }
    })
  } else {
    ElMessage.error('获取SPU图片列表失败')
  }
  // 获取SPU所有已有的销售属性信息
  let spuSaleAttrListResult: ResponseData<SpuSaleAttrList[]> =
    await getSpuSaleAttr(addOrUpdateSpuFormParams.value.id!)
  if (spuSaleAttrListResult.code === 200) {
    addOrUpdateSpuFormParams.value.spuSaleAttrList = spuSaleAttrListResult.data
  } else {
    ElMessage.error('获取SPU销售属性信息失败')
  }
}

const handlePictureCardPreview = async (file: UploadFile) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const handleRemove = () => {}

const handleUploadSuccess = () => {
  addOrUpdateSpuFormRef.value?.validateField('spuImageList')
}

const beforeUpload = (file: UploadRawFile) => {
  if (
    file.type !== 'image/jpeg' &&
    file.type !== 'image/png' &&
    file.type !== 'image/jpg' &&
    file.type !== 'image/gif'
  ) {
    ElMessage.error('只能上传 JPG/PNG/GIF 文件')
    return false
  }
  if (file.size / 1024 / 1024 > 4) {
    ElMessage.error('图片大小不能超过 4MB')
    return false
  }
  return true
}

const noSelectSaleAttrList = computed(() => {
  return allSaleAttrList.value.filter(
    (item) =>
      !addOrUpdateSpuFormParams.value.spuSaleAttrList?.some(
        (saleAttr) => saleAttr.baseSaleAttrId === item.id,
      ),
  )
})

const addSpuAttr = () => {
  if (selectedSaleAttr.value) {
    addOrUpdateSpuFormParams.value.spuSaleAttrList.push({
      baseSaleAttrId: selectedSaleAttr.value,
      saleAttrName: allSaleAttrList.value.find(
        (item) => item.id === selectedSaleAttr.value,
      )?.name as string,
      spuSaleAttrValueList: [],
      spuId: addOrUpdateSpuFormParams.value.id,
    })
    selectedSaleAttr.value = undefined
    addOrUpdateSpuFormRef.value?.validateField('spuSaleAttrList')
  }
}

const deleteSpuAttrValue = (
  saleAttrIndex: number,
  saleAttrValueIndex: number,
) => {
  addOrUpdateSpuFormParams.value.spuSaleAttrList[
    saleAttrIndex
  ].spuSaleAttrValueList.splice(saleAttrValueIndex, 1)
}

const showAddBtn = (index: number) => {
  addOrUpdateSpuFormParams.value.spuSaleAttrList[index].showAddBtn = true
}

const addAttrValueData = (index: number) => {
  if (!toAddAttrValueData.value || toAddAttrValueData.value.trim() === '') {
    ElMessage.error('属性值不能为空')
    return
  }
  if (
    addOrUpdateSpuFormParams.value.spuSaleAttrList[
      index
    ].spuSaleAttrValueList.some(
      (item) => item.saleAttrValueName === toAddAttrValueData.value,
    )
  ) {
    ElMessage.error('属性值已存在')
    return
  }
  addOrUpdateSpuFormParams.value.spuSaleAttrList[
    index
  ].spuSaleAttrValueList.push({
    saleAttrValueName: toAddAttrValueData.value,
    baseSaleAttrId:
      addOrUpdateSpuFormParams.value.spuSaleAttrList[index].baseSaleAttrId,
  })
  addOrUpdateSpuFormParams.value.spuSaleAttrList[index].showAddBtn = false
  toAddAttrValueData.value = ''
}

const deleteSpuAttr = (index: number) => {
  addOrUpdateSpuFormParams.value.spuSaleAttrList.splice(index, 1)
}

const attrValueInputRef = (element: any) => {
  nextTick(() => {
    element?.focus()
  })
}

const spuImageListValidator = (_rule: any, _value: any, callback: any) => {
  if (spuImageList.value.length === 0) {
    callback(new Error('请上传SPU图片'))
  } else {
    callback()
  }
}

const spuSaleAttrListValidator = (_rule: any, _value: any, callback: any) => {
  if (addOrUpdateSpuFormParams.value.spuSaleAttrList.length === 0) {
    callback(new Error('请添加SPU销售属性'))
  } else {
    for (
      let i = 0;
      i < addOrUpdateSpuFormParams.value.spuSaleAttrList.length;
      i++
    ) {
      if (
        !addOrUpdateSpuFormParams.value.spuSaleAttrList[i]
          .spuSaleAttrValueList ||
        addOrUpdateSpuFormParams.value.spuSaleAttrList[i].spuSaleAttrValueList
          .length === 0
      ) {
        callback(new Error('请添加SPU第' + (i + 1) + '行销售属性值'))
        return
      }
    }
    callback()
  }
}

const rules = {
  spuName: [{ required: true, message: 'SPU名称不能为空', trigger: 'blur' }],
  tmId: [{ required: true, message: 'SPU品牌不能为空', trigger: 'blur' }],
  description: [
    { required: true, message: 'SPU描述不能为空', trigger: 'blur' },
  ],
  spuImageList: [
    { required: true, validator: spuImageListValidator, trigger: 'blur' },
  ],
  spuSaleAttrList: [
    { required: true, validator: spuSaleAttrListValidator, trigger: 'blur' },
  ],
}

const saveSpu = () => {
  // 校验数据是否合法
  addOrUpdateSpuFormRef.value.validate(async (valid: any) => {
    if (!valid) {
      ElMessage.error('请填写完整的SPU信息')
      return
    }

    // 将 SPU 图片列表集成到请求参数中
    addOrUpdateSpuFormParams.value.spuImageList = []
    for (let index = 0; index < spuImageList.value.length; index++) {
      const spuImage: UploadUserFile = spuImageList.value[index]
      let imgUrl = spuImage.url
      if (spuImage.response) {
        imgUrl = (spuImage.response as { data: string }).data
      }
      addOrUpdateSpuFormParams.value.spuImageList.push({
        imgName: spuImage.name,
        imgUrl: imgUrl,
      })
    }
    // addOrUpdateSpuFormParams.value.spuImageList = spuImageList.value.map(
    //   (item) => {
    //     return {
    //       imgName: item.name,
    //       imgUrl: item.url,
    //     }
    //   },
    // )
    // 保存 SPU 信息
    let result: ResponseData = await saveOrUpdateSpuData(
      addOrUpdateSpuFormParams.value,
    )
    if (result.code === 200) {
      ElMessage.success('保存成功')
      $emit('changeScene', 0)
    } else {
      ElMessage.error('保存失败')
    }
  })
}

const cancelAddOrUpdateSpu = () => {
  addOrUpdateSpuFormParams.value = initAddOrUpdateSpuFormParams()
  $emit('changeScene', 0)
}

defineExpose({
  initUpdateSpuParams,
  initAddSpuParams,
})
</script>

<style scoped lang="scss"></style>
