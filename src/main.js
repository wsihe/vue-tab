import Vue from 'vue'
import router from './router/router'
import store from './store/'
import { tabManager } from './libs/tabManager'
import directives from '@/directives'
import fitlers from '@/fitlers'
import Icon from 'components/icon'
import Wuui from 'wuui'
import 'wuui/dist/wuui.css'

Vue.use(Wuui)

Vue.config.productionTip = false
Vue.component('icon', Icon)
tabManager(Vue, store, router)

directives()
fitlers()

new Vue({
  router,
  store,
}).$mount('#app')
