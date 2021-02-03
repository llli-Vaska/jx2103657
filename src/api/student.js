import axios from "axios";
//student请求
export function student(offset,limit){
    return axios({
        url:'/student',
        method:'post',
        data: {
            offset: offset,
            limit: limit
        }
    })
}