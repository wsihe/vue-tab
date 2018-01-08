import Vue from 'vue';
import Router from 'vue-router';
import index from '@/index';
// import store from '@/store/'
// import {RECORD_LOGIN} from '@/store/mutation-types'
// import {getStore} from '@/common/utils'

Vue.use(Router);

const home = () => import('@/pages/home.vue');
const iconDemo = () => import('@/pages/icon/iconDemo.vue');
const loginDemo = () => import('@/pages/login/loginDemo.vue');
const buttonDemo = () => import('@/pages/basic/buttonDemo.vue');
const switchDemo = () => import('@/pages/form/switchDemo.vue');
const paginationDemo = () => import('@/pages/data/paginationDemo.vue');
const messageDemo = () => import('@/pages/notice/messageDemo.vue');
const collapseDemo = () => import('@/pages/others/collapseDemo.vue');
// const login = r => require.ensure([], () => r(require('@/pages/login/login')), 'login')
const router = new Router({
  mode: 'history',
  routes:
  [{
    path: '/',
    component: index,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: '/home',
        name: 'home',
        meta: {
          title: 'Introduction',
        },
        component: home,
      },
      {
        path: '/loginDemo',
        name: 'loginDemo',
        meta: {
          title: '登陆拦截',
        },
        component: loginDemo,
      },
      {
        path: '/iconDemo',
        name: 'iconDemo',
        meta: {
          title: 'icon-svg',
        },
        component: iconDemo,
      },
      {
        path: '/paginationDemo',
        name: 'paginationDemo',
        meta: {
          title: 'Pagination-分页',
        },
        component: paginationDemo,
      },
      {
        path: '/messageDemo',
        name: 'messageDemo',
        meta: {
          title: 'Message-消息',
        },
        component: messageDemo,
      },
      {
        path: '/collapseDemo',
        name: 'collapseDemo',
        meta: {
          title: 'Collapse-折叠',
        },
        component: collapseDemo,
      }],
  }],
});

// if (getStore('token')) {
//   store.commit(RECORD_LOGIN, getStore('token'))
// }
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth !== 0) {
//     if (store.state.token) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router;

