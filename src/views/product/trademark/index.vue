<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="showAddTradeMarkDialog"
      >
        添加品牌
      </el-button>
      <!-- 表格组件：用于展示已经添加的数据 -->
      <el-table
        :data="tableData"
        style="margin: 10px 0"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        border
      >
        <el-table-column label="序号" prop="id" width="100px"></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌Logo">
          <template #default="scope">
            <img
              :src="scope.row.logoUrl"
              alt="图片出错"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="showUpdateTradeMarkDialog(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`你确定要删除${scope.row.tmName}吗？`"
              @confirm="confirmDelete(scope.row.id)"
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
      <!-- 分页组件：用于分页展示数据 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        :page-size="limit"
        layout="prev, pager, next, jumper, -> ,sizes, total"
        :total="total"
      />
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog
      v-model="dialogVisible"
      :title="addOrUpdateTradeMarkFormData.id ? '修改品牌' : '添加品牌'"
      @close="closeDialog"
    >
      <el-form
        style="width: 80%"
        ref="addOrUpdateTradeMarkFormDataRef"
        :model="addOrUpdateTradeMarkFormData"
        :rules="rules"
      >
        <el-form-item label="品牌名称" prop="tmName" label-width="100px">
          <el-input
            placeholder="请输入品牌名称"
            v-model="addOrUpdateTradeMarkFormData.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 上传接口必须添加 api 否则不会进行路由转发 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="addOrUpdateTradeMarkFormData.logoUrl"
              :src="addOrUpdateTradeMarkFormData.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  addOrUpdateTradeMark,
  getTrademarkList,
  removeTradeMark,
} from '@/api/product/trademark'
import { TradeMark, TradeMarkData } from '@/api/product/trademark/type'
import { ResponseData, SUCCESS_CODE } from '@/api/type'
import { ElMessage, FormInstance, UploadRawFile } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

let currentPage = ref(1)
let limit = ref(3)
let total = ref(0)
let tableData = ref<TradeMark[]>([])

const getTrademarkListData = async () => {
  const res: ResponseData<TradeMarkData> = await getTrademarkList(
    currentPage.value,
    limit.value,
  )
  total.value = res.data.total
  tableData.value = res.data.records
}

const handleSizeChange = (val: number) => {
  limit.value = val
  getTrademarkListData()
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getTrademarkListData()
}

const showAddTradeMarkDialog = () => {
  dialogVisible.value = true
}

const showUpdateTradeMarkDialog = (row: TradeMark) => {
  dialogVisible.value = true
  Object.assign(addOrUpdateTradeMarkFormData, row)
}

const confirmDelete = async (id: number) => {
  const resp: ResponseData = await removeTradeMark(id)
  if (resp.code === SUCCESS_CODE) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getTrademarkListData()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

onMounted(() => {
  getTrademarkListData()
})

const getInitFormData = () => {
  return {
    id: undefined,
    tmName: '',
    logoUrl: '',
  }
}

let dialogVisible = ref(false)
let addOrUpdateTradeMarkFormDataRef = ref<FormInstance>()
let addOrUpdateTradeMarkFormData = reactive(getInitFormData())

const closeDialog = () => {
  addOrUpdateTradeMarkFormDataRef.value?.resetFields()
  Object.assign(addOrUpdateTradeMarkFormData, getInitFormData())
}

const tmNameValidator = (rule: any, value: string, callback: any) => {
  if (value.trim().length < 2) {
    callback(new Error('品牌名称长度必须大于等于2'))
  } else {
    callback()
  }
}

const logoUrlValidator = (rule: any, value: string, callback: any) => {
  if (!value || value.length === 0) {
    callback(new Error('请上传品牌LOGO'))
  } else {
    callback()
  }
}

const rules = {
  tmName: [{ required: true, validator: tmNameValidator, trigger: 'change' }],
  logoUrl: [{ required: true, validator: logoUrlValidator, trigger: 'blur' }],
}

const handleAvatarSuccess = (res: ResponseData) => {
  addOrUpdateTradeMarkFormData.logoUrl = res.data
  addOrUpdateTradeMarkFormDataRef.value?.validateField('logoUrl')
}

const beforeAvatarUpload = (rawFile: UploadRawFile) => {
  console.log(rawFile)
  // 上传文件前对文件的类型和大小做限制
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpg' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '文件大小必须小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '文件必须为JPG|PNG|GIF格式',
    })
  }
}

const cancel = () => {
  dialogVisible.value = false
}

const confirm = async () => {
  await addOrUpdateTradeMarkFormDataRef.value
    ?.validate()
    .then(async () => {
      const resp: ResponseData = await addOrUpdateTradeMark(
        addOrUpdateTradeMarkFormData,
      )

      if (resp.code === SUCCESS_CODE) {
        ElMessage({
          type: 'success',
          message: addOrUpdateTradeMarkFormData.id ? '修改成功' : '添加成功',
        })
        dialogVisible.value = false
        getTrademarkListData()
      } else {
        ElMessage({
          type: 'error',
          message: addOrUpdateTradeMarkFormData.id ? '修改失败' : '添加失败',
        })
      }
    })
    .catch((err) => {
      console.log(err)
      ElMessage({
        type: 'error',
        message: '请检查表单的错误信息并修正',
      })
    })
}
</script>

<style scoped lang="scss">
.box-card {
  margin: 20px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
