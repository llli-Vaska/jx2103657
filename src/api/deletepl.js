import axios from "axios";

//删除publiclecture请求
export function deletepl(params){
    return axios({
        url:'/deletepl',
        method:'post',
        data: params
    })
}

//删除jobfair请求
export function deletejf(params){
    return axios({
        url:'/deletejf',
        method:'post',
        data: params
    })
}
//删除position请求
export function deletejfe(params){
    return axios({
        url:'/deletejfe',
        method:'post',
        data: params
    })
}