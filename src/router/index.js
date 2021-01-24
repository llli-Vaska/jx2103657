import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    // admin登录页面
    path: '/adminlogin',
    name: 'AdminLogin',
    component: () => import('@/views/login/AdminLogin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
