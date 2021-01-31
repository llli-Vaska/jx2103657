import axios from "axios";
import store from "@/vuex/store";
//使用axios拦截器在请求头加上token
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = store.state.token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)