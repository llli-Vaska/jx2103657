import axios from "axios";
//studentall请求
export function studentall() {
    return axios({
        url: '/studentall',
        method: 'post',

    })
}
//查询学生表