const TOKEN_KEY = 'token'
export const SET_TOKEN = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const GET_TOKEN = () => {
  return localStorage.getItem(TOKEN_KEY) || ''
}
