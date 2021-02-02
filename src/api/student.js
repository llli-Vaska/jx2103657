import axios from "axios";
//student请求
export function student(){
    return axios({
        url:'/student',
        method:'post',

    })
}