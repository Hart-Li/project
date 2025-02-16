<template>
  <div>
    <el-form
      :model="addOrUpdateSkuFormData"
      ref="addOrUpdateSkuFormRef"
      :rules="rules"
      label-width="110px"
    >
      <el-form-item label="SKU名称" prop="skuName">
        <el-input
          v-model="addOrUpdateSkuFormData.skuName"
          placeholder="请输入SKU名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="SKU价格(元)" prop="price">
        <el-input
          v-model="addOrUpdateSkuFormData.price"
          type="number"
          placeholder="请输入sku价格"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(g)" prop="weight">
        <el-input
          v-model="addOrUpdateSkuFormData.weight"
          type="number"
          placeholder="请输入重量"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="SKU描述" prop="skuDesc">
        <el-input
          v-model="addOrUpdateSkuFormData.skuDesc"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入SKU描述"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性" prop="skuAttrValueList">
        <el-form :inline="true">
          <el-form-item
            v-for="(item, index) in allProductAttrList"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select
              v-model="allProductAttrList[index].valueId"
              placeholder="请选择"
              style="width: 100px"
              clearable
            >
              <el-option
                v-for="optionItem in item.attrValueList"
                :key="optionItem.id"
                :label="optionItem.valueName"
                :value="optionItem.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性" prop="skuSaleAttrValueList">
        <el-form :inline="true">
          <el-form-item
            v-for="(item, index) in allSpuSaleAttrDataList"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select
              v-model="allSpuSaleAttrDataList[index].saleAttrValueId"
              placeholder="请选择"
              clearable
              style="width: 100px"
            >
              <el-option
                v-for="optionItem in item.spuSaleAttrValueList"
                :key="optionItem.id"
                :label="optionItem.saleAttrValueName"
                :value="optionItem.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称" prop="skuDefaultImg">
        <el-table
          ref="spuImageListTableRef"
          :data="allSpuImageList"
          border
          stripe
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="id" label="图片">
            <template #default="scope">
              <img
                :src="scope.row.imgUrl"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                type="primary"
                size="default"
                @click="handleClickSetDefaultImg(scope.row)"
              >
                设置默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdateSkuData">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { getAttrInfoList } from '@/api/product/attr'
import { ProductAttrData } from '@/api/product/attr/type'
import { saveOrUpdateSkuInfo } from '@/api/product/sku'
import { SaveOrUpdateSkuData } from '@/api/product/sku/type'
import { getSpuImages, getSpuSaleAttr } from '@/api/product/spu'
import { SpuData, SpuImageData, SpuSaleAttrList } from '@/api/product/spu/type'
import { ResponseData, SUCCESS_CODE } from '@/api/type'
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

let $emit = defineEmits(['changeScene'])

const categoryStore = useCategoryStore()
const getInitAddOrUpdateSkuFormData = (): SaveOrUpdateSkuData => {
  return {
    category3Id: undefined,
    spuId: undefined,
    tmId: undefined,
    skuName: '',
    skuDesc: '',
    price: undefined,
    skuDefaultImg: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuImageList: [],
    weight: '',
  }
}

let addOrUpdateSkuFormData = ref(getInitAddOrUpdateSkuFormData())
let addOrUpdateSkuFormRef = ref()
let allProductAttrList = ref<ProductAttrData[]>([])
let allSpuSaleAttrDataList = ref<SpuSaleAttrList[]>([])
let allSpuImageList = ref<SpuImageData[]>([])
let spuImageListTableRef = ref()

const initData = async () => {
  // 获取全部的平台属性
  const productAttrDataResp: ResponseData<ProductAttrData[]> =
    await getAttrInfoList(
      categoryStore.c1Id!,
      categoryStore.c2Id!,
      addOrUpdateSkuFormData.value.category3Id!,
    )
  if (productAttrDataResp.code === SUCCESS_CODE) {
    allProductAttrList.value = productAttrDataResp.data
  } else {
    ElMessage.error('获取平台属性失败')
  }
  // 获取全部的销售属性
  const spuSaleAttrDataResp: ResponseData<SpuSaleAttrList[]> =
    await getSpuSaleAttr(addOrUpdateSkuFormData.value.spuId!)
  if (spuSaleAttrDataResp.code === SUCCESS_CODE) {
    allSpuSaleAttrDataList.value = spuSaleAttrDataResp.data
  } else {
    ElMessage.error('获取销售属性失败')
  }
  // 获取spu的图片列表
  const spuImageListResp: ResponseData<SpuImageData[]> = await getSpuImages(
    addOrUpdateSkuFormData.value.spuId!,
  )
  if (spuImageListResp.code === SUCCESS_CODE) {
    allSpuImageList.value = spuImageListResp.data
  } else {
    ElMessage.error('获取spu图片失败')
  }
}

const initAddData = (row: SpuData) => {
  addOrUpdateSkuFormData.value = getInitAddOrUpdateSkuFormData()
  Object.assign(addOrUpdateSkuFormData.value, {
    category3Id: row.category3Id,
    spuId: row.id,
    tmId: row.tmId,
  })
  initData()
}

const skuAttrValueListValidator = (_rule: any, _value: any, callback: any) => {
  if (allProductAttrList.value.length === 0) {
    callback(new Error('至少选择一项平台属性'))
  } else {
    let atLeastOneNoEmpty = allProductAttrList.value.some(
      (item) => item.valueId !== undefined,
    )
    if (!atLeastOneNoEmpty) {
      callback(new Error('至少选择一项平台属性'))
    }
    callback()
  }
}

const skuSaleAttrValueListValidator = (
  _rule: any,
  _value: any,
  callback: any,
) => {
  if (allSpuSaleAttrDataList.value.length === 0) {
    callback(new Error('至少选择一项销售属性'))
  } else {
    let atLeastOneNoEmpty = allSpuSaleAttrDataList.value.some(
      (item) => item.saleAttrValueId !== undefined,
    )
    if (!atLeastOneNoEmpty) {
      callback(new Error('至少选择一项销售属性'))
    }
    callback()
  }
}

const skuDefaultImgValidator = (_rule: any, _value: any, callback: any) => {
  if (
    addOrUpdateSkuFormData.value.skuDefaultImg === undefined ||
    addOrUpdateSkuFormData.value.skuDefaultImg === ''
  ) {
    callback(new Error('至少上传一张图片'))
  } else {
    callback()
  }
}

const rules = {
  skuName: [{ required: true, message: '请输入SKU名称', trigger: 'blur' }],
  price: [{ required: true, message: '请输入SKU价格', trigger: 'blur' }],
  weight: [{ required: true, message: '请输入重量', trigger: 'blur' }],
  skuDesc: [{ required: true, message: '请输入SKU描述', trigger: 'blur' }],
  skuAttrValueList: [
    { required: true, validator: skuAttrValueListValidator, trigger: 'blur' },
  ],
  skuSaleAttrValueList: [
    {
      required: true,
      validator: skuSaleAttrValueListValidator,
      trigger: 'blur',
    },
  ],
  skuDefaultImg: [
    { required: true, validator: skuDefaultImgValidator, trigger: 'blur' },
  ],
}

const handleClickSetDefaultImg = (row: SpuImageData) => {
  spuImageListTableRef.value.clearSelection()
  spuImageListTableRef.value.toggleRowSelection(row)
  addOrUpdateSkuFormData.value.skuDefaultImg = row.imgUrl
}

const saveOrUpdateSkuData = () => {
  addOrUpdateSkuFormRef.value.validate(async (valid: boolean) => {
    if (!valid) {
      ElMessage.error('请检查输入项')
      return
    }
    // 将平台属性集成到请求参数中
    addOrUpdateSkuFormData.value.skuAttrValueList = allProductAttrList.value
      .filter((item) => {
        return item.valueId
      })
      .map((item) => {
        return {
          attrId: item.id!,
          valueId: item.valueId!,
        }
      })
    // 将销售属性集成到请求参数中
    addOrUpdateSkuFormData.value.skuSaleAttrValueList =
      allSpuSaleAttrDataList.value
        .filter((item) => {
          return item.saleAttrValueId
        })
        .map((item) => {
          return {
            saleAttrId: item.id!,
            saleAttrValueId: item.saleAttrValueId!,
          }
        })
    let result: ResponseData = await saveOrUpdateSkuInfo(
      addOrUpdateSkuFormData.value,
    )
    if (result.code === SUCCESS_CODE) {
      ElMessage.success('保存成功')
      $emit('changeScene', 0)
    } else {
      ElMessage.error('保存失败')
    }
  })
}
const cancel = () => {
  $emit('changeScene', 0)
}

defineExpose({
  initAddData,
})
</script>

<style scoped lang="scss"></style>
