import Vue from 'vue'
import dates from './dates'
import normals from './normals'
import matchs from './matchs'

export default function () {
  const filters = Object.assign(
    {},
    dates,
    normals,
    matchs
  )

  Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
  })
}
