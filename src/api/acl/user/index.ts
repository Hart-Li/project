import { ResponseData } from '@/api/type'
import request from '@/utils/request'
import {
  AssignRoleListData,
  AssignUserRolesParams,
  UserData,
  UserListData,
} from './type'

enum API {
  // 分页获取用户列表
  GET_USER_LIST_BY_PAGE_URL = '/admin/acl/user',
  // 添加用户
  SAVE_USER_URL = '/admin/acl/user/save',
  // 更新用户
  UPDATE_USER_URL = '/admin/acl/user/update',
  // 删除用户
  DELETE_USER_URL = '/admin/acl/user/remove',
  // 获取用户分配角色
  GET_USER_ASSIGN_ROLES_URL = '/admin/acl/user/toAssign',
  // 分配用户角色
  ASSIGN_USER_ROLES_URL = '/admin/acl/user/doAssignRole',
}

export const getUserListByPage = (
  page: number,
  limit: number,
  username: string,
) =>
  request.get<any, ResponseData<UserListData>>(
    `${API.GET_USER_LIST_BY_PAGE_URL}/${page}/${limit}?username=${username}`,
  )

export const reqSaveOrUpdateUser = (data: UserData) => {
  if (data.id) {
    return request.put<UserData, ResponseData>(API.UPDATE_USER_URL, data)
  }
  return request.post<UserData, ResponseData>(API.SAVE_USER_URL, data)
}

export const deleteUser = (id: string) =>
  request.delete<any, ResponseData>(`${API.DELETE_USER_URL}/${id}`)

export const reqGetUserAssignRoles = (userId: string) =>
  request.get<any, ResponseData<AssignRoleListData>>(
    `${API.GET_USER_ASSIGN_ROLES_URL}/${userId}`,
  )

export const reqAssignUserRoles = (data: AssignUserRolesParams) =>
  request.post<AssignUserRolesParams, ResponseData>(
    API.ASSIGN_USER_ROLES_URL,
    data,
  )
