export interface UserData {
  id: string
  gmtCreate?: string
  gmtModified?: string
  deleted?: boolean
  username: string
  password?: string
  nickName?: string
  salt?: string
  token?: string
  roleName?: string
}

export interface UserListData {
  total: number
  items: UserData[]
}
