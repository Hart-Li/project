export interface PermissionData {
  id?: string
  gmtCreate?: string
  gmtModified?: string
  deleted?: boolean
  pid?: string
  name: string
  code?: string
  toCode?: any
  type?: number
  status?: any
  level: number
  children?: PermissionData[]
  select?: boolean
}

export interface PermissionListData {
  children: PermissionData[]
}
