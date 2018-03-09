/**
 * 通用vue 指令
 */
import { removeClass, addClass } from '@/utils/dom'

export default {
  upDown (el, { value, oldValue }) {
    if (oldValue === value) return
    if (isNaN(value)) {
      value = null
    } else if (typeof value === 'boolean') {
      value = value === true ? 1 : -1
    }
    if (value === null) {
      removeClass(el, 'up')
      removeClass(el, 'down')
      addClass(el, 'null')
    } else if (value >= 0) {
      removeClass(el, 'down')
      removeClass(el, 'null')
      addClass(el, 'up')
    } else if (value < 0) {
      removeClass(el, 'up')
      removeClass(el, 'null')
      addClass(el, 'down')
    }
  },
  disable: function (el, value) {
    this.el.disabled = !!value
  }
  // other directives
}
