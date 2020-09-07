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

/**
 * 即使不设置responseType为JSON的时候，也能自动把JSON字符串处理成对象返回
 * @param data
 */
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
