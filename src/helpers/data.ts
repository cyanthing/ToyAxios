import { isPlainObject } from './util'

/**
 * 转化POST请求时候传入的data，JSON字符串的处理
 * @param data
 */
export function transformRequest (data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}
