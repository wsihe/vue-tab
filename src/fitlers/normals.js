/**
 * @desc 常用的filter
 */

export default {
  /**
   * @filter 百分比filter，将数字转换成百分比
   * @params value      {Number}      数字，未转化的
   * @params [digits]   {Number}      转化成百分比数字所携带的小数点，默认2
   * @params [multiply] {Boolean}     是否value*100，默认为true
   * @params [force]    {Boolean}     是否强制加给0添加百分号，默认为false
   */
  percent (value, multiply, digits, force) {
    if (!force && value === 0) { return value }
    digits = digits == null ? 2 : digits
    let number = !multiply ? value * 100 : value
    if (isNaN(number) || value === null) { return '--' }
    var result
    if (digits === 0) { result = parseInt(number, 10) + '%' } else { result = number.toFixed(digits) + '%' }
    return result
  },
  /**
   * 空值占位符, 如果值等于null或者空字符串, 则显示--
   * @params value      处理值
   * @params [holder]  默认显示 "--"
   */
  nullHolder (value, holder) {
    holder = holder || '--'
    return (value == null || value === '' || isNaN(value)) ? holder : value
  },
  /**
   * 格式化数字，固定几位小数点
   * @param number 数字
   * @param digits 几位小数点, 默认两位
   * @return 指定小数点位数后的字符串格式
   */
  toFixed (number, digits) {
    if (number == null) {
      return null
    }
    digits = digits == null ? 2 : digits
    var type = typeof number
    if (type === 'number') {
      return Number(number).toFixed(digits)
    } else if (type === 'string') {
      var n = parseFloat(number)
      if (isNaN(n)) {
        return ''
      } else {
        return Number(n).toFixed(digits)
      }
    } else {
      return ''
    }
  },
  /**
   * 字段高亮, 将要高亮的字段替换成span标签, 只做简单替换, 不支持正则查找
   * @param str 字符串
   * @param highlightWord 要高亮的字符
   */
  highlight (str, highlightWord) {
    console.log(str, highlightWord)
    if (!str) { return str }
    if (!highlightWord) { return str }
    return str.replace(highlightWord, "<span class='highlight'>" + highlightWord + '</span>')
  }
}
