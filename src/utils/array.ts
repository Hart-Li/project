// 对象深拷贝
export function deepClone(obj: any) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  const copy: any = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone(obj[key])
    }
  }
  return copy
}
