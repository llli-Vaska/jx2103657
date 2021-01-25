import axios from "axios";

export function login(params) {
    return axios({
        url:'/adminlogin',
        method:'post',
        params: params
    })
}
