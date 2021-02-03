import axios from "axios";
//student请求
export function deletestudent(params){
    return axios({
        url:'/deletestudent',
        method:'post',
        data: params
    })
}