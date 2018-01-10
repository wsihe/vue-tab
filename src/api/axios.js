import { router } from '@/router'
import { browser } from 'utils/browser'
import axios from 'axios'
import { API_REQUEST_TIMEOUT, STATUS_NETWOEK_ERROR, STATUS_UNAUTHORIZED } from 'utils/constants'

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function () {
  // 创建 axios 实例
  let instance = axios.create({
    timeout: API_REQUEST_TIMEOUT
  })
  // 添加请求拦截器
  instance.interceptors.request.use(config => {
    if (config.method === 'post') {
      // post 提交时，将对象转换为string, 为处理Java后台解析问题
      config.data = JSON.stringify(config.data)
    } else if (config.method === 'get' && browser.isIE) {
      // 给GET 请求后追加时间戳， 解决IE GET 请求缓存问题
      let symbol = config.url.indexOf('?') > 0 ? '&' : '?'
      config.url += symbol + '_=' + Date.now()
    }
    // 请求发送前进行处理
    return config
  }, error => {
    // 请求错误处理
    return Promise.reject(error)
  })

  // 添加响应拦截器
  instance.interceptors.response.use(response => {
    // 返回的 status 统一再这里处理
    let { data } = response
    return data
  }, error => {
    // 响应错误处理
    let info
    if (!error.response) {
      info = {
        code: STATUS_NETWOEK_ERROR,
        msg: 'Network Error'
      }
    } else {
      let { response } = error
      let { status, statusText, data, config } = response
      // token 失效则跳转到登录页面
      // checkauth 接口交由其自己处理
      if (status === STATUS_UNAUTHORIZED && config.url !== '/api/checkauth') {
        router.replace({
          name: 'login'
        })
      } else {
        info = {
          code: status,
          data: data,
          msg: statusText
        }
      }
    }
    return Promise.reject(info)
  })
  return instance
}
