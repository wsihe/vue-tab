import Vue from 'vue'
import normals from './normals'

export default function () {
  const directives = Object.assign(
    {},
    normals
  )
  Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key])
  })
}
