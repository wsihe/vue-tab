
/**
 * @desc 财富平台常用编码转中文
 */

export default {
  /**
   * @filter 策略代码转中文
   */
  strategyCode (value) {
    const map = {
      'taa': 'taa策略',
      'blmodel': 'bl策略',
      'riskparity': '风险平价策略',
      'macrofactor': '宏观因子事件策略'
    }
    return map[value] || value
  },
  /**
   * @filter 投资期限
   */
  investPeriod (value) {
    let str = ''
    if (!value) {
      str = '--'
    } else if (value >= 0 && value <= 12) {
      str = '短期'
    } else if (value > 12 && value <= 36) {
      str = '中期'
    } else if (value > 36) {
      str = '长期'
    }
    return str
  }
}
