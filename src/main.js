import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
//加载element 组件库
import ElementUI from 'element-ui';
import 'default-passive-events'
//加载element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css';
//加载全局样式文件
import './styles/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import './api/interceptor';
// 引入状态管理
import store from './vuex/store';
Vue.use(Vuex);
Vue.use(Antd);

import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3000';


// 全局注册element 组件库
Vue.use(ElementUI);
Vue.config.productionTip = false;



//创建Vue 根实例
//把 render 配置到根实例中
//通过 render 方法把 App 根组件渲染到 #App 入口旁节点
new Vue({
  router,
  store, //使用store
  render: h => h(App)
}).$mount('#app')

