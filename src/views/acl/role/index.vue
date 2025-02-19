<template>
  <div>
    <el-card>
      <el-form
        :model="searchRoleParams"
        ref="searchRoleFormRef"
        :inline="true"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <el-form-item label="角色名称">
          <el-input v-model="searchRoleParams.roleName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClickSearchRole">
            搜索
          </el-button>
          <el-button @click="handleClickResetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always">
      <el-button type="primary" size="default" @click="showAddRoleDialog">
        添加角色
      </el-button>
      <el-table
        :data="roleDatas"
        border
        stripe
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        style="margin-top: 10px"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间"></el-table-column>
        <el-table-column prop="gmtModified" label="修改时间"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template #default="scope">
            <el-button
              type="success"
              size="small"
              @click="showAssignRolePermissionDrawer(scope.row)"
            >
              分配权限
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="showEditRoleDialog(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确定删除该角色吗？"
              @confirm="handleClickDeleteRole(scope.row)"
            >
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper, -> , sizes, total"
        :total="totalNum"
        background
        style="margin: 10px 0"
      >
        :pager-count="7">
      </el-pagination>
    </el-card>
    <el-dialog
      v-model="saveOrUpdateRoleDialogVisible"
      :title="saveOrUpdateRoleData.id ? '更新角色' : '添加角色'"
      width="30%"
      @close="handleCloseSaveOrUpdateRoleDialog"
    >
      <el-form
        :model="saveOrUpdateRoleData"
        ref="saveOrUpdateRoleFormRef"
        :rules="rules"
      >
        <el-form-item label="角色名称">
          <el-input
            v-model="saveOrUpdateRoleData.roleName"
            placeholder="请输入角色名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveOrUpdateRole">保存</el-button>
          <el-button @click="handleCloseSaveOrUpdateRoleDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-drawer
      v-model="assignRolePermissionDrawerVisible"
      title="分配角色权限"
      size="30%"
      :destroy-on-close="true"
      :show-close="true"
      :wrapperClosable="true"
    >
      <el-form>
        <el-form-item label="角色名称">
          <el-input
            v-model="saveOrUpdateRoleData.roleName"
            clearable
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="分配角色">
          <el-tree
            :data="allPermissions"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="selectedPermissionIds"
            :props="selectPermissionProps"
            ref="assignRolePermissionTreeRef"
          ></el-tree>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAssignRolePermissions">
            保存
          </el-button>
          <el-button @click="assignRolePermissionDrawerVisible = false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { PermissionData } from '@/api/acl/permission/type'
import {
  reqAssignRolePermissions,
  reqDeleteRole,
  reqGetRolePermissions,
  reqGetRolesByPage,
  reqSaveOrUpdateRole,
} from '@/api/acl/role'
import {
  RoleData,
  RoleListData,
  RolePermissionsData,
} from '@/api/acl/role/type'
import { ResponseData, USER_SUCCESS_CODE } from '@/api/type'
import { ElMessage } from 'element-plus'
import _ from 'lodash'
import { onMounted, ref } from 'vue'

const searchRoleFormRef = ref()
const searchRoleParams = ref({
  roleName: '',
})
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let totalNum = ref<number>(0)
let roleDatas = ref<RoleData[]>([])

const searchRoles = async () => {
  const result: ResponseData<RoleListData> = await reqGetRolesByPage(
    pageNo.value,
    pageSize.value,
    searchRoleParams.value.roleName,
  )
  if (result.code === USER_SUCCESS_CODE) {
    totalNum.value = result.data.total
    roleDatas.value = result.data.items
  } else {
    ElMessage.error('获取角色列表失败')
  }
}

onMounted(() => {
  searchRoles()
})

const handleClickSearchRole = () => {
  searchRoles()
}

const handleClickResetSearch = () => {
  searchRoleFormRef.value.resetFields()
  searchRoles()
}

const initSaveOrUpdateRoleData = () => {
  return {
    id: undefined,
    roleName: '',
  }
}
let saveOrUpdateRoleData = ref<RoleData>(initSaveOrUpdateRoleData())
let saveOrUpdateRoleDialogVisible = ref<boolean>(false)
let saveOrUpdateRoleFormRef = ref()

const roleNameValidator = (_rule: any, value: string, callback: any) => {
  if (value.trim() === '') {
    callback(new Error('请输入角色名称'))
  } else {
    callback()
  }
}

const rules = {
  roleName: [{ required: true, validator: roleNameValidator, trigger: 'blur' }],
}

const showAddRoleDialog = () => {
  saveOrUpdateRoleData.value = initSaveOrUpdateRoleData()
  saveOrUpdateRoleDialogVisible.value = true
}

const showEditRoleDialog = (roleData: RoleData) => {
  saveOrUpdateRoleData.value = _.cloneDeep(roleData)
  saveOrUpdateRoleDialogVisible.value = true
}
const handleClickDeleteRole = async (roleData: RoleData) => {
  const result: ResponseData = await reqDeleteRole(roleData.id!)
  if (result.code === USER_SUCCESS_CODE) {
    ElMessage.success('删除角色成功')
    searchRoles()
  } else {
    ElMessage.error('删除角色失败')
  }
}

const sizeChange = (val: number) => {
  pageSize.value = val
  searchRoles()
}

const currentChange = (val: number) => {
  pageNo.value = val
  searchRoles()
}

const handleCloseSaveOrUpdateRoleDialog = () => {
  saveOrUpdateRoleDialogVisible.value = false
}

const saveOrUpdateRole = async () => {
  saveOrUpdateRoleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      saveOrUpdateRoleData.value.roleName =
        saveOrUpdateRoleData.value.roleName.trim()
      const result: ResponseData = await reqSaveOrUpdateRole(
        saveOrUpdateRoleData.value,
      )
      if (result.code === USER_SUCCESS_CODE) {
        ElMessage.success('保存角色成功')
        searchRoles()
        saveOrUpdateRoleDialogVisible.value = false
      } else {
        ElMessage.error('保存角色失败')
      }
    } else {
      ElMessage.error('请检查输入的数据是否合法')
    }
  })
}

let assignRolePermissionDrawerVisible = ref<boolean>(false)
let assignRolePermissionTreeRef = ref()
let allPermissions = ref<PermissionData[]>([])
let selectedPermissionIds = ref<string[]>([])
const selectPermissionProps = {
  children: 'children',
  label: 'name',
}

const getSelectedLeafPermissionIds = (permissions: PermissionData[]) => {
  const selectedLeafPermissionIds: string[] = []
  permissions.forEach((item) => {
    if (item.select && (!item.children || item.children.length == 0)) {
      selectedLeafPermissionIds.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      selectedLeafPermissionIds.push(
        ...getSelectedLeafPermissionIds(item.children),
      )
    }
  })
  return selectedLeafPermissionIds
}

const showAssignRolePermissionDrawer = async (row: RoleData) => {
  saveOrUpdateRoleData.value = row
  // 获取角色权限
  const result: ResponseData<RolePermissionsData> = await reqGetRolePermissions(
    row.id!,
  )
  if (result.code === USER_SUCCESS_CODE) {
    allPermissions.value = result.data.children
    selectedPermissionIds.value = getSelectedLeafPermissionIds(
      result.data.children,
    )
    assignRolePermissionDrawerVisible.value = true
  } else {
    ElMessage.error('获取角色权限失败')
  }
}

const handleAssignRolePermissions = async () => {
  const checkedKeys = assignRolePermissionTreeRef.value.getCheckedKeys()
  const halfCheckedKeys = assignRolePermissionTreeRef.value.getHalfCheckedKeys()
  const selectedPermissionIds = _.uniq([...checkedKeys, ...halfCheckedKeys])
  const result: ResponseData = await reqAssignRolePermissions({
    roleId: saveOrUpdateRoleData.value.id!,
    permissionIdList: selectedPermissionIds,
  })
  if (result.code === USER_SUCCESS_CODE) {
    ElMessage.success('分配角色权限成功')
    assignRolePermissionDrawerVisible.value = false
  } else {
    ElMessage.error('分配角色权限失败')
  }
}
</script>

<style scoped lang="scss"></style>
