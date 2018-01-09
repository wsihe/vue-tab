
let ua = window.navigator.userAgent
let isIE = ('ActiveXObject' in window)
let isChrome = ua.match(/Chrome/i)
let isMobile = !!(ua.match(/(iPhone|iPad|iPod)/i) || ua.match(/Android/i) || ua.match(/Windows Phone/i) || ua.match(/IEMobile/i))
let IEVersion = null
let isIE8, isIE9, isIE10, isIE11
isIE8 = isIE9 = isIE10 = isIE11 = false
let appName = navigator.appName
if (appName === 'Microsoft Internet Explorer' || isIE) {
  let ret = ua.match(/MSIE (\d+[.\d]*)/)
  if (ret) {
    let version = ret[1]
    IEVersion = version
    let num = parseInt(version, 10)
    isIE8 = num === 8
    isIE9 = num === 9
    isIE10 = num === 10
    isIE11 = num === 11
  }
}

/**
* 浏览器环境判断模块
*/
export const browser = {
  isChrome: isChrome,
  isIE: isIE,
  isMobile: isMobile,
  IEVersion: IEVersion,
  isIE8: isIE8,
  isIE9: isIE9,
  isIE10: isIE10,
  isIE11: isIE11
}
