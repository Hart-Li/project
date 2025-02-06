export const getTimeIntervalStr = () => {
  const hours = new Date().getHours()
  if (hours >= 0 && hours < 6) {
    return '凌晨好'
  } else if (hours >= 6 && hours < 12) {
    return '上午好'
  } else if (hours >= 12 && hours < 18) {
    return '下午好'
  } else {
    return '晚上好'
  }
}
