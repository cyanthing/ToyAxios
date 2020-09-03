import { isObject, isDate } from './util'

/**
 * encode特殊符号，但一些特别的符号需要保留，注意空格被保留成+符号
 * @param val
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 处理params参数拼接到URL上
 * @param url
 * @param params 参数对象
 */
export function buildURL(url: string, params?: any): string {
  if (params === undefined) {
    return url
  }

  const parts: string[] = []

  // 遍历params对象的属性，处理后放到parts数组中，做join拼接到URL上
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    // 是数组，val本身就是any[]的形式，不是数组就处理成[val]的形式，params参数若是数组形式则会被处理成 key[]=xxx&key[]=yyy，因此key拼接了[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    // 对values数组中的数据做具体类型对应的处理
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')   // 若url本身带哈希符号
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams // 若url本身带?参数连接符号
  }
  return url
}
