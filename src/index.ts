import { AxiosPromise, AxiosRequestConfig } from './types'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'

/**
 * axios入口函数
 * @param config
 */
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

/**
 * 对传入axios函数的config进行处理
 * @param config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

/**
 * 处理url与params的拼接
 * @param config
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

/**
 * 处理请求时携带在body中data
 * @param config
 */
function transformRequestData (config: AxiosRequestConfig): any {
  const { data } = config
  return transformRequest(data)
}

/**
 * 处理请求时headers的规范
 * @param config
 */
function transformHeaders (config: AxiosRequestConfig): any {
  // 为了让逻辑走到自动添加 application/json;charset=utf-8 的 headers 的目的，这里给个默认值，不会被processHeaders的第一层判断给排除掉
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
