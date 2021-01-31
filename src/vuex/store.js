import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        uid: 0
    },
    mutations: {
        // 存储用户uid
        setToken(state, n) {
            state.token = n
        },
        // 存储用户的uid
        setAdmin(state, n) {
            state.uid = n
        },
    },
    // 处理业务逻辑的操作 相当于service层
    actions: {
        setToken(context, obj){
            context.commit('setToken',obj)
        },
        setAdmin(context, obj){
            context.commit('setAdmin',obj)
        },

    }
})