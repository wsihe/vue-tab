import Vue from 'vue'
import router from './router/router'
import store from './store/'
import { tabManager } from './libs/tabManager'
import directives from './directives/directives'
import fitlers from '@/fitlers'
import Icon from 'components/icon-svg'
import Wuui from 'wuui'
import 'wuui/dist/wuui.css'

Vue.use(Wuui)

Vue.config.productionTip = false
Vue.component('icon-svg', Icon)
tabManager(Vue, store, router)

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key]);
})

fitlers()

new Vue({
  router,
  store,
}).$mount('#app')
