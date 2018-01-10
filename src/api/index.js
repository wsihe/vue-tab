import axios from './axios'
import { STATUS_OK, MOCK_RESPONSE_TIMES } from 'utils/constants'

/**
 * API 公共请求模块
 * @return {Object}
 */
export default function () {
  let instance = axios()
  return {

    /**
     * get 请求
     * @param url [请求地址]
     * @param params [请求参数] 非必传
     * @param headers [请求头部] 非必传
     */
    get (url, params, headers) {
      return instance.get(url, {
        params, headers
      })
    },

    /**
     * post 请求
     * @param url [请求地址]
     * @param params [请求参数] 非必传
     * @param headers [请求头部] 非必传
     */
    post (url, params, headers) {
      return instance.post(url, params, {
        headers
      })
    },

    /**
     * put 请求
     * @param url [请求地址]
     * @param params [请求参数] 非必传
     * @param headers [请求头部] 非必传
     */
    put  (url, params, headers) {
      return instance.put(url, params, {
        headers
      })
    },

    /**
     * delete 请求
     * @param url [请求地址]
     * @param params [请求参数] 非必传
     * @param headers [请求头部] 非必传
     */
    delete (url, params, headers) {
      return instance.delete(url, {
        params, headers
      })
    }
  }
}
