import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    // admin登录页面
    path: '/adminlogin',
    name: 'AdminLogin',
    component: () => import('@/views/login/AdminLogin.vue')
  },
  {
    //后台管理页面
    path: '/',
    name: 'Index',
    component: () => import('@/views/admin/AdminIndex')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
