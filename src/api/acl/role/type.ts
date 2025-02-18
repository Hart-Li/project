import { PermissionData } from '../permission/type'

export interface RoleData {
  id?: string
  gmtCreate?: string
  gmtModified?: string
  deleted?: boolean
  roleName: string
  remark?: any
}

export interface RoleListData {
  total: number
  items: RoleData[]
}

export interface AssignRoleParams {
  permissionIdList: string[]
  roleId: string
}

export interface RolePermissionsData {
  children: PermissionData[]
}
