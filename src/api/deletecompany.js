import axios from "axios";
//company请求
export function deletecompany(params){
    return axios({
        url:'/deletecompany',
        method:'post',
        data: params
    })
}