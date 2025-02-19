import { ResponseData } from '@/api/type'
import request from '@/utils/request'
import { PermissionData, PermissionListData } from './type'

enum API {
  // 获取全部的权限列表
  GET_ALL_PERMISSION_LIST_URL = '/admin/acl/permission',
  // 保存权限
  SAVE_PERMISSION_URL = '/admin/acl/permission/save',
  // 编辑权限
  UPDATE_PERMISSION_URL = '/admin/acl/permission/update',
  // 删除权限
  DELETE_PERMISSION_URL = '/admin/acl/permission/remove',
}
export const reqGetAllPermissionList = () =>
  request.get<any, ResponseData<PermissionListData>>(
    API.GET_ALL_PERMISSION_LIST_URL,
  )

export const reqSaveOrUpdatePermission = (data: PermissionData) => {
  if (data.id) {
    return request.put<any, ResponseData>(API.UPDATE_PERMISSION_URL, data)
  }
  return request.post<any, ResponseData>(API.SAVE_PERMISSION_URL, data)
}

export const reqDeletePermission = (id: number) =>
  request.delete<any, ResponseData>(`${API.DELETE_PERMISSION_URL}/${id}`)
