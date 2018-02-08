// 是否为生产模式
const isProd = process.env.NODE_ENV === 'production'

export default function (page) {
  if (isProd) {
    return () => import(`@/pages/${page}.vue`)
  } else {
    return require(`@/pages/${page}.vue`).default
  }
}
