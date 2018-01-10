/**
 * HTTP 状态吗
 */
export const STATUS_OK = 200
export const STATUS_BAD_REQUEST = 400
export const STATUS_UNAUTHORIZED = 401
export const STATUS_FORBIDDEN = 403
export const STATUS_NOT_FOUND = 404
export const STATUS_REQUEST_TIMEOUT = 408
export const STATUS_NO_MORE = 410
export const STATUS_ENTITY_TWO_LARGE = 413
export const STATUS_INTERNAL_SERVER_ERROR = 500
export const STATUS_BAD_GATEWAY = 502
export const STATUS_SERVICE_UNAVAILABLE = 503
export const STATUS_GATEWAY_TIMEOUT = 504 // 网关超时, 一般是后台服务挂
export const STATUS_NETWOEK_ERROR = 0 // 没有网络

/**
 * 貌似以下 3 个写在 config 会更合理？
 * 不同换件区分开来？
 */
export const MOCK_RESPONSE_TIMES = 200 // API Mock 的响应时间，ms
export const API_REQUEST_TIMEOUT = 3000 // API 超时时间，ms
export const CHECK_AUTH_INTERVAL_TIMES = 60000 // 检测 token 的轮询间隔时间，ms


/**
 * 页面空态文案常量
 */
export const STATUS_OFFLINE_TEXT = '最遥远的距离就是没有网络'
export const STATUS_NOT_FOUND_TEXT = '抱歉，页面找不到了'
export const STATUS_LIMITED_AUTH_TEXT = '抱歉，您没有访问此页面的权限'
export const STATUS_ERROR_TEXT = '正在修复故障，请稍后:'
export const STATUS_TIMEOUT_TEXT = '网络不给力，请稍后:'
export const STATUS_EMPTY_TEXT = '暂无相关数据'

