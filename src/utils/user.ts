export const userValidator = (_rule: any, value: any, callback: any) => {
  // 用户名正则校验规则
  const usernameReg = /^[a-zA-Z0-9]{5,15}$/
  if (!usernameReg.test(value)) {
    callback(new Error('用户名需要5-15位的英文与数字组合'))
  } else {
    callback()
  }
}
export const passwordValidator = (_rule: any, value: any, callback: any) => {
  // 密码正则校验规则：密码必须由6-20位的英文、数字或特殊字符的组合
  const passwordReg = /^[a-zA-Z\d`~!@#$%^&*()-=_+,./\[\]{}<>?]{6,20}$/
  if (!passwordReg.test(value)) {
    callback(new Error('密码需要6-20位的英文、数字和特殊字符的组合'))
  } else {
    callback()
  }
}

export const nickNameValidator = (_rule: any, value: any, callback: any) => {
  // 昵称正则校验规则
  const nickNameReg = /^[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$/
  if (!nickNameReg.test(value)) {
    callback(new Error('昵称需要2-10位的中文、英文和数字组合'))
  } else {
    callback()
  }
}