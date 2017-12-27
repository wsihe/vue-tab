import Vue from 'vue';
import router from './router/router';
import store from './store/';
import { tabManager } from './libs/tabManager';
import ElementUI from 'element-ui';
import './css/element-theme/lib/index.css';
import Icon from 'components/icon-svg'

import directives from './directives/directives';
import * as filters from './filter/filters';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.component('icon-svg', Icon)
tabManager(Vue, store, router);

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key]);
});

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
}).$mount('#app');
