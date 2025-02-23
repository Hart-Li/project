<template>
  <div>
    <el-card shadow="always">
      <el-form
        :model="queryFormParams"
        ref="queryFormRef"
        :inline="true"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="queryFormParams.username"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always">
      <el-button
        type="primary"
        @click="handleShowAddDrawer"
        v-has="`btn.User.add`"
      >
        添加用户
      </el-button>
      <el-button type="danger" @click="handleBatchDeleteUser">
        批量删除
      </el-button>

      <el-table
        :data="userDatas"
        border
        stripe
        style="margin-top: 10px"
        @selection-change="handleSelectUserChange"
      >
        <el-table-column type="selection" width="80px"></el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="80px"
        ></el-table-column>
        <el-table-column prop="id" label="ID" width="80px"></el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="120px"
        ></el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称"
          width="120px"
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色"
          width="120px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="gmtCreate"
          label="创建时间"
          width="120px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="gmtModified"
          label="更新时间"
          width="120px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="220px" fixed="right">
          <template #default="scope">
            <el-button
              type="success"
              size="small"
              @click="handleShowAssignRolesDrawer(scope.row)"
            >
              分配角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="handleShowEditDrawer(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确定删除该用户吗？"
              @confirm="handleDeleteUser(scope.row)"
            >
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="totalNum"
      background
    ></el-pagination>
    <el-drawer
      v-model="addOrUpdateUserDrawerVisible"
      :title="saveOrUpdateUserData.id ? '编辑用户' : '添加用户'"
      :before-close="closeAddOrUpdateUserDrawer"
      :destroy-on-close="true"
      :show-close="true"
      :wrapperClosable="true"
    >
      <el-form
        :model="saveOrUpdateUserData"
        ref="saveOrUpdateUserFormRef"
        :rules="getRules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="saveOrUpdateUserData.username"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          v-show="!saveOrUpdateUserData.id || saveOrUpdateUserData.id === ''"
        >
          <el-input
            v-model="saveOrUpdateUserData.password"
            type="password"
            show-password
            placeholder="请输入密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input
            v-model="saveOrUpdateUserData.nickName"
            placeholder="请输入昵称"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeAddOrUpdateUserDrawer">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateUser">确 定</el-button>
      </template>
    </el-drawer>
    <el-drawer
      v-model="assignRolesDrawerVisible"
      title="分配用户角色"
      :before-close="handleAssignRolesDrawerClose"
      :destroy-on-close="true"
      :show-close="true"
      :wrapperClosable="true"
    >
      <el-form ref="assignUserRolesFormRef">
        <el-form-item label="用户名">
          <el-input
            v-model="saveOrUpdateUserData.username"
            :disabled="true"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="角色选择">
          <el-checkbox
            v-model="selectAllRoles"
            :indeterminate="selectPartRoles"
            @change="handleSelectAllRolesChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group
            v-model="assignRoles"
            @change="handleSelectAssignRolesChange"
          >
            <el-checkbox
              v-for="item in allRolesList"
              :key="item.id"
              :value="item"
            >
              {{ item.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="handleAssignRolesDrawerClose">取 消</el-button>
        <el-button type="primary" @click="assignUserRoles">确 定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { RoleData } from '@/api/acl/role/type'
import {
  deleteUser,
  getUserListByPage,
  reqAssignUserRoles,
  reqBatchDeleteUser,
  reqGetUserAssignRoles,
  reqSaveOrUpdateUser,
} from '@/api/acl/user'
import { AssignRoleListData, UserData, UserListData } from '@/api/acl/user/type'
import { ResponseData, USER_SUCCESS_CODE } from '@/api/type'
import useUserStore from '@/store/modules/user'
import { nickNameValidator, userValidator } from '@/utils/user'
import { ElMessage } from 'element-plus'
import _ from 'lodash'
import { computed, onMounted, ref } from 'vue'

const queryFormRef = ref()
const queryFormParams = ref({
  username: '',
})
let userDatas = ref<UserData[]>([])
let totalNum = ref<number>(0)
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)

const queryUsers = async () => {
  let result: ResponseData<UserListData> = await getUserListByPage(
    pageNo.value,
    pageSize.value,
    queryFormParams.value.username,
  )
  if (result.code === USER_SUCCESS_CODE) {
    userDatas.value = result.data.items
    totalNum.value = result.data.total
  } else {
    ElMessage.error('查询用户列表失败')
  }
}

onMounted(async () => {
  await queryUsers()
})

const handleQuery = () => {
  queryUsers()
}

const handleReset = () => {
  queryFormRef.value.resetFields()
  // 重新查询
  queryUsers()
}

const userStore = useUserStore()
const handleDeleteUser = async (row: UserData) => {
  if (row.username === userStore.username) {
    ElMessage.error('不能删除自己')
    return
  }
  let result: ResponseData = await deleteUser(row.id)
  if (result.code === USER_SUCCESS_CODE) {
    ElMessage.success('删除用户成功')
    queryUsers()
  } else {
    ElMessage.error('删除用户失败')
  }
}

const sizeChange = (val: number) => {
  pageSize.value = val
  queryUsers()
}

const currentChange = (val: number) => {
  pageNo.value = val
  queryUsers()
}

let addOrUpdateUserDrawerVisible = ref(false)
const initSaveOrUpdateUserData = () => {
  return {
    id: '',
    username: '',
    nickName: '',
    password: '',
  }
}
let saveOrUpdateUserData = ref<UserData>(initSaveOrUpdateUserData())
let saveOrUpdateUserFormRef = ref()

const getRules = computed(() => {
  let rules: any = {
    username: [{ required: true, validator: userValidator, trigger: 'blur' }],
    nickName: [
      { required: true, validator: nickNameValidator, trigger: 'blur' },
    ],
    // password: [{ required: true, validator: passwordValidator, trigger: 'blur' }],
  }
  if (!saveOrUpdateUserData.value.id || saveOrUpdateUserData.value.id === '') {
    rules.password = [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ]
  }
  return rules
})

const handleShowAddDrawer = () => {
  saveOrUpdateUserData.value = initSaveOrUpdateUserData()
  addOrUpdateUserDrawerVisible.value = true
}

let selectedUserDatas = ref<UserData[]>([])
const handleSelectUserChange = (val: UserData[]) => {
  selectedUserDatas.value = val
}

const handleBatchDeleteUser = async () => {
  const selectedUserIds = selectedUserDatas.value.map((item) => item.id)
  if (!selectedUserIds || selectedUserIds.length === 0) {
    ElMessage.error('请选择要删除的用户')
    return
  }
  const result: ResponseData = await reqBatchDeleteUser(selectedUserIds)
  if (result.code === USER_SUCCESS_CODE) {
    ElMessage.success('批量删除用户成功')
    queryUsers()
  } else {
    ElMessage.error('批量删除用户失败')
  }
}

const handleShowEditDrawer = (row: UserData) => {
  saveOrUpdateUserData.value = _.cloneDeep(row)
  addOrUpdateUserDrawerVisible.value = true
  beforeChangeUsername.value = row.username
}
let beforeChangeUsername = ref('')

const saveOrUpdateUser = () => {
  saveOrUpdateUserFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      // 保存或更新用户
      if (saveOrUpdateUserData.value.id) {
        // 更新用户
        saveOrUpdateUserData.value.password = undefined
      }
      console.log('saveOrUpdateUserData.value', saveOrUpdateUserData.value)
      const result: ResponseData = await reqSaveOrUpdateUser(
        saveOrUpdateUserData.value,
      )
      if (result.code === USER_SUCCESS_CODE) {
        ElMessage.success(
          saveOrUpdateUserData.value.id ? '更新用户成功' : '添加用户成功',
        )
        closeAddOrUpdateUserDrawer()
        if (beforeChangeUsername.value === userStore.username) {
          document.location.reload()
        } else {
          queryUsers()
        }
      } else {
        ElMessage.error(
          saveOrUpdateUserData.value.id ? '更新用户失败' : '添加用户失败',
        )
      }
    } else {
      ElMessage.error('请检查输入的数据')
    }
  })
}

const closeAddOrUpdateUserDrawer = () => {
  addOrUpdateUserDrawerVisible.value = false
}

let assignRolesDrawerVisible = ref(false)
let assignRoles = ref<RoleData[]>([])
let allRolesList = ref<RoleData[]>([])

const selectAllRoles = computed(() => {
  return assignRoles.value.length === allRolesList.value.length
})

const selectPartRoles = computed(() => {
  return (
    assignRoles.value.length > 0 &&
    assignRoles.value.length < allRolesList.value.length
  )
})

const handleSelectAllRolesChange = (val: boolean) => {
  console.log(val)
  if (val) {
    assignRoles.value = _.cloneDeep(allRolesList.value)
  } else {
    assignRoles.value = []
  }
}

const getUserAssignRoles = async (userId: string) => {
  let result: ResponseData<AssignRoleListData> =
    await reqGetUserAssignRoles(userId)
  if (result.code === USER_SUCCESS_CODE) {
    assignRoles.value = result.data.assignRoles
    allRolesList.value = result.data.allRolesList
  } else {
    ElMessage.error('获取用户角色失败')
  }
}

const handleSelectAssignRolesChange = (val: RoleData[]) => {
  assignRoles.value = val
}

const handleShowAssignRolesDrawer = (row: UserData) => {
  saveOrUpdateUserData.value = _.cloneDeep(row)
  getUserAssignRoles(row.id)
  assignRolesDrawerVisible.value = true
}

const handleAssignRolesDrawerClose = () => {
  assignRolesDrawerVisible.value = false
}

const assignUserRoles = async () => {
  let newRoleIds = assignRoles.value.map((item) => item.id!)
  let result: ResponseData = await reqAssignUserRoles({
    userId: saveOrUpdateUserData.value.id,
    roleIdList: newRoleIds,
  })
  if (result.code === USER_SUCCESS_CODE) {
    ElMessage.success('分配用户角色成功')
    handleAssignRolesDrawerClose()
    queryUsers()
  } else {
    ElMessage.error('分配用户角色失败')
  }
}
</script>

<style scoped lang="scss"></style>
