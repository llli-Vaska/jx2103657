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
    // name: 'AdminIndex',
    meta: {
      requireAuth:true //进入该路由是需要登录的
    },
    component: () => import('@/views/admin/AdminIndex'),
    children: [
        // 首页
      {
        path: '',
        name: 'HoPage',
        meta: {
          requireAuth:true //进入该路由是需要登录的
        },
        component: () => import('@/components/index/HoPage')
      },
      {//学生管理
        path: 'StManage',
        name: 'StManage',
        meta: {
          requireAuth:true //进入该路由是需要登录的
        },
        component: () => import('@/components/management/StManage')
      },
      {//企业管理
        path: 'BuManage',
        name: 'BuManage',
        meta: {
          requireAuth:true //进入该路由是需要登录的
        },
        component: () => import('@/components/management/BuManage')
      },
      {//宣讲会信息管理
        path: 'PlManage',
        name: 'PlManage',
        meta: {
          requireAuth:true //进入该路由是需要登录的
        },
        component: () => import('@/components/management/PlManage')
      },
      {//招聘会信息管理
        path: 'JfManage',
        name: 'JfManage',
        meta: {
          requireAuth:true //进入该路由是需要登录的
        },
        component: () => import('@/components/management/JfManage')
      },
      {//宣讲会发布
        path: 'PlPublish',
        name: 'PlPublish',
        meta: {
          requireAuth:true //进入该路由是需要登录的
        },
        component: () => import('@/components/publish/PlPublish')
      },
      {//招聘会发布
        path: 'JfPublish',
        name: 'JfPublish',
        meta: {
          requireAuth:true //进入该路由是需要登录的
        },
        component: () => import('@/components/publish/JfPublish')
      },
      {//招聘信息审核
        path: 'JfExamine',
        name: 'JfExamine',
        meta: {
          requireAuth:true //进入该路由是需要登录的
        },
        component: () => import('@/components/examine/JfExamine')
      },
    ]
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
        //如果没有token则返回到登录路径
        next('/')
      }
    }
  }else if (to.path === '/' && window.localStorage.getItem('uid')) {

    next('/admin')
  }
  next()
})

export default router
