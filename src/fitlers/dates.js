import Moment from 'moment'

/**
 * 日期格式化filter
 * @see http://momentjs.cn/
 */

export default {
  /**
   * @filter 日期filter
   * @params time      {Number}      时间，未转化的
   * @params [str]     {String}      转化规则，默认'2017.07.30'
   */
  dateConvert (time, str = 'YYYY.MM.DD HH:mm:ss') {
    if (time === null) { return '--' }
    return time && Moment(time).format(str)
  }
}
