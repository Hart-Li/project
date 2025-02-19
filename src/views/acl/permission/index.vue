<template>
  <div>
    <el-card>
      <el-table :data="permissionListData" border stripe row-key="id">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="code" label="权限值"></el-table-column>
        <el-table-column prop="gmtModified" label="修改时间"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="success"
              size="small"
              @click="handleShowAddDialog(row)"
              :disabled="row.level === 4"
            >
              {{ row.level === 1 || row.level === 2 ? '添加菜单' : '添加功能' }}
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleShowUpdateDialog(row)"
              :disabled="row.pid == 0"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确定删除吗？"
              @confirm="handleDeletePermission(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" :disabled="row.pid == 0">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      v-model="addOrUpdateDialogVisible"
      :title="addOrUpdateData.id ? '更新权限' : '添加权限'"
      width="30%"
      @close="handleCloseAddOrUpdateDialog"
    >
      <el-form
        :model="addOrUpdateData"
        ref="addOrUpdateFormRef"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="addOrUpdateData.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值" prop="code">
          <el-input v-model="addOrUpdateData.code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveOrUpdatePermission">
            保存
          </el-button>
          <el-button @click="handleCloseAddOrUpdateDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  reqDeletePermission,
  reqGetAllPermissionList,
  reqSaveOrUpdatePermission,
} from '@/api/acl/permission'
import { PermissionData, PermissionListData } from '@/api/acl/permission/type'
import { ResponseData, USER_SUCCESS_CODE } from '@/api/type'
import { ElMessage } from 'element-plus'
import _ from 'lodash'
import { onMounted, ref } from 'vue'

let permissionListData = ref<PermissionData[]>()

const getPermissionList = async () => {
  const result: ResponseData<PermissionListData> =
    await reqGetAllPermissionList()
  if (result.code === USER_SUCCESS_CODE) {
    permissionListData.value = result.data.children
  } else {
    ElMessage.error('获取权限列表失败')
  }
}

onMounted(() => {
  getPermissionList()
})

let addOrUpdateDialogVisible = ref<boolean>(false)
const initAddOrUpdateData: PermissionData = {
  id: undefined,
  pid: undefined,
  name: '',
  code: '',
  level: 1,
  children: [],
}
let addOrUpdateData = ref<PermissionData>(initAddOrUpdateData)
let addOrUpdateFormRef = ref()
const rules = {
  name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入权限值', trigger: 'blur' }],
}

const handleShowAddDialog = (row: PermissionData) => {
  addOrUpdateData.value = { ...initAddOrUpdateData }
  addOrUpdateData.value.pid = row.id
  addOrUpdateData.value.level = row.level + 1
  addOrUpdateDialogVisible.value = true
}

const handleShowUpdateDialog = (row: PermissionData) => {
  addOrUpdateData.value = _.cloneDeep(row)
  addOrUpdateDialogVisible.value = true
}

const handleDeletePermission = async (id: number) => {
  const result: ResponseData = await reqDeletePermission(id)
  if (result.code === USER_SUCCESS_CODE) {
    ElMessage.success('删除成功')
    getPermissionList()
  } else {
    ElMessage.error('删除失败')
  }
}

const handleCloseAddOrUpdateDialog = () => {
  addOrUpdateDialogVisible.value = false
  addOrUpdateData.value = initAddOrUpdateData
}

const saveOrUpdatePermission = () => {
  addOrUpdateFormRef.value.validate(async (valid: boolean) => {
    if (!valid) {
      ElMessage.error('请检查输入内容')
      return
    }
    const result: ResponseData = await reqSaveOrUpdatePermission(
      addOrUpdateData.value,
    )
    if (result.code === USER_SUCCESS_CODE) {
      ElMessage.success('保存成功')
      getPermissionList()
      handleCloseAddOrUpdateDialog()
    } else {
      ElMessage.error('保存失败')
    }
  })
}
</script>

<style scoped lang="scss"></style>
