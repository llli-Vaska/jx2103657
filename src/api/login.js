import axios from "axios";
//admin登录请求
export function login(params){
    return axios({
        url:'/adminlogin',
        method:'post',
        data: params
    })
}
