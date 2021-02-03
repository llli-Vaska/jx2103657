import axios from "axios";
//student请求
export function editstudent(params){
    return axios({
        url:'/editstudent',
        method:'post',
        data: params
    })
}