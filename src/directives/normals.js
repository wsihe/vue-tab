import { removeClass, addClass } from '@/utils/dom'

export default {
  /**
  *
  * */
  'up-down' (el, binding, vnode) {
    let value = binding.value
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
  }
}
