
export default async function (callback) {
  let env = process.env.NODE_ENV === 'production' ? 'pro':'dev'
  const convertToReadOnly = function (target) {
    let obj = {}
    for (const attr in target) {
      let value = target[attr]
      if (typeof value === 'object' && value.constructor === Object) {
        value = convertToReadOnly(value)
      }
      Object.defineProperty(obj, attr, {
        value: value,
        writable: false,
        configurable: false,
        enumerable: false
      })
    }
    return obj
  }

  const coonfigESModule = await import('@/config/' + env + '.env.js')
  const config = coonfigESModule.default
  Object.defineProperty(window, 'wealth', {
    value: convertToReadOnly(config),
    writable: false,
    configurable: false,
    enumerable: false
  })
  callback && callback()
}
