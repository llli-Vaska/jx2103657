import axios from "axios";
//student请求
export function editstudent(params){
    return axios({
        url:'/editstudent',
        method:'post',
        data: params
    })
}
//compamy请求
export function editcompany(params){
    return axios({
        url:'/editcompany',
        method:'post',
        data: params
    })
}

//examine adopt refuse请求
export function adoptrefuse(params){
    return axios({
        url:'/adoptrefuse',
        method:'post',
        data: params
    })
}

