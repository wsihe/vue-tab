/**
 * Created by river on 2017/4/26.
 */

import axios from 'axios'
import qs from 'qs'
import router from '@/router/router'
import store from '@/store/'
import { browser } from 'utils/browser'
import { RECORD_LOGOUT } from '@/store/mutation-types'

axios.defaults.timeout = 6000
// axios.defaults.headers.common['userId'] = '3009333'
axios.defaults.baseURL = '/rest'

const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded;charset=UTF-8'
const JSON_CONTENT_TYPE = 'application/json'

axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    // post 提交时，将对象转换为string, 为处理Java后台解析问题
    config.data = JSON.stringify(config.data)
  } else if (config.method === 'get' && browser.isIE) {
    // 给GET 请求后追加时间戳， 解决IE GET 请求缓存问题
    let symbol = config.url.indexOf('?') > 0 ? '&' : '?'
    config.url += symbol + '_=' + Date.now()
  }
  if (store.state.token) {
    config.headers.Authorization = `token ${store.state.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  return Promise.reject(response)
}, error => {
  let err = formatError(error)
  if (err.status === 401) {
    store.commit(RECORD_LOGOUT)
    router.replace({
      path: 'login',
      query: {redirect: router.currentRoute.fullPath}
    })
    return
  }
  return Promise.reject(err)
})

//  Promise
function fetch (method, url, params) {
  let promise = new Promise((resolve, reject) => {
    let options = {
      type: method,
      name: 'params',
      contentType: JSON_CONTENT_TYPE,
      responseType: 'json'
    }
    switch (method) {
      case 'POST':
        options.name = 'data'
        break
      case 'POSTFORM':
        options.type = 'POST'
        options.name = 'data'
        options.contentType = FORM_CONTENT_TYPE
        break
    }
    axios({
      method: options.type,
      url,
      [options.name]: params,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': options.contentType
      },
      responseType: options.responseType
    }).then(response => { resolve(response.data) })
      .catch((error) => { reject(error) })
  })
  return promise
}

function formatError (jxr) {
  let response = jxr.response
  let res = {
    url: jxr.config.url,
    status: response.status,
    statusText: response.statusText,
    data: response.data || null,
    code: null,
    msg: null
  }
  let data = res.data
  let msg = ''
  if (data) {
    if (data.code) {
      res.code = data.code
      if (typeof res.code === 'string' && res.code.match(/^\d+$/)) {
        res.code = parseInt(res.code, 10)
      }
    }
    if (data.message) {
      msg = data.message
    }
  }
  if (msg.length > 50) {
    msg = msg.substring(0, 47) + '...'
  }
  res.msg = msg
  return res
}

export default async(type = 'get', url = '', params = {}) => {
  type = type.toUpperCase()
  return await fetch(type, url, params).catch((err) => {
    console.error("[FETCH] '" + err.url + "' error: " + err.status + ',' + err.msg)
  })
}
