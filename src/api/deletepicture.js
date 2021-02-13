import axios from "axios";


//company请求
export function deletepicture(params){
    return axios({
        url:'/deletepicture',
        method:'post',
        data: params
    })
}