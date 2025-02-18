import { ResponseData } from '@/api/type'
import request from '@/utils/request'
import {
  AssignRoleParams,
  RoleData,
  RoleListData,
  RolePermissionsData,
} from './type'

enum API {
  // 分页获取角色列表
  GET_ROLES_BY_PAGE = '/admin/acl/role',
  // 添加角色
  SAVE_ROLE_URL = '/admin/acl/role/save',
  // 修改角色
  UPDATE_ROLE_URL = '/admin/acl/role/update',
  // 删除角色
  DELETE_ROLE_URL = '/admin/acl/role/remove',
  // 获取分配角色权限列表
  GET_ASSIGN_ROLE_PERMISSIONS_URL = '/admin/acl/permission/toAssign',
  // 分配角色权限
  ASSIGN_ROLE_PERMISSIONS_URL = '/admin/acl/permission/doAssignAcl',
}

export const reqGetRolesByPage = (
  pageNo: number,
  pageSize: number,
  roleName: string,
) =>
  request.get<any, ResponseData<RoleListData>>(
    `${API.GET_ROLES_BY_PAGE}/${pageNo}/${pageSize}?roleName=${roleName}`,
  )

export const reqSaveOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<RoleData, ResponseData>(API.UPDATE_ROLE_URL, data)
  } else {
    return request.post<RoleData, ResponseData>(API.SAVE_ROLE_URL, data)
  }
}

export const reqDeleteRole = (id: string) =>
  request.delete<any, ResponseData>(`${API.DELETE_ROLE_URL}/${id}`)

export const reqGetRolePermissions = (roleId: string) =>
  request.get<any, ResponseData<RolePermissionsData>>(
    `${API.GET_ASSIGN_ROLE_PERMISSIONS_URL}/${roleId}`,
  )

export const reqAssignRolePermissions = (data: AssignRoleParams) =>
  request.post<any, ResponseData>(API.ASSIGN_ROLE_PERMISSIONS_URL, data)
