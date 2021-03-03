import axios from "axios";
//studentall请求
export function studentall() {
    return axios({
        url: '/studentall',
        method: 'post',

    })
}
//查询学生表
//男
export function studentsexman() {
    return axios({
        url: '/studentsexman',
        method: 'post',
    })
}
//女
export function studentsexwoman() {
    return axios({
        url: '/studentsexwoman',
        method: 'post',
    })
}