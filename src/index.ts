import { AxiosRequestConfig } from './types'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import xhr from './xhr'

/**
 * axios入口函数
 * @param config
 */
function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

/**
 * 对传入axios函数的config进行处理
 * @param config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
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

export default axios
