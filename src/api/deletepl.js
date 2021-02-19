import axios from "axios";

//删除publiclecture请求
export function deletepl(params){
    return axios({
        url:'/deletepl',
        method:'post',
        data: params
    })
}