import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/vuex/store";

Vue.use(VueRouter)

const routes = [
  {
    // admin登录页面
    path: '/',
    name: 'AdminLogin',
    component: () => import('@/views/login/AdminLogin.vue')
  },
  {
    //后台管理页面
    path: '/admin',
    name: 'AdminIndex',
    meta: {
      requireAuth:true //进入该路由是需要登录的
    },
    component: () => import('@/views/admin/AdminIndex')
  }
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (to.meta.requireAuth) {
    if (token) next()
    else {
      const token = window.localStorage.getItem('token')
      if (token) {
        store.dispatch('setAdmin', window.localStorage.getItem('uid'))
        store.dispatch('setToken', token)

        next()
      } else {
        next('/')
      }
    }
  }else if (to.path === '/' && window.localStorage.getItem('uid')) {

    next('/admin')
  }
  next()
})

export default router
