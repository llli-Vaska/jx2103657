import axios from "axios";
//addstudent请求
export function addstudent(params){
    return axios({
        url:'/addstudent',
        method:'post',
        data: params
    })
}
