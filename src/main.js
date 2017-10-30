import Vue from 'vue'
import router from './router/router'
import store from './store/'
import { tabManager } from './libs/tabManager'
import directives from './directives/directives'
import Marked from './directives/marked'
import * as filters from './filter/filters'
import Wuui from 'wuui'
import 'wuui/dist/wuui.css'

Vue.use(Wuui)

Vue.config.productionTip = false

Vue.use(Marked)

tabManager(Vue, store, router)

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store
}).$mount('#app')
