import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    // 登录页面
    path: '/adminlogin',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/AdminLogin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
