import { isPlainObject } from './util'

/**
 * 在使用axios时，传入的headers，例如Content-Type大小写不明确，使用该方法规范
 * @param headers
 * @param normalizedName
 */
function normalizeHeaderName (headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach((name) => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * 处理请求时，对header的处理
 * @param headers 传入的headers
 * @param data 请求时候的data
 */
export function processHeaders (headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
