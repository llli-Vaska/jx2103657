import axios from "axios";
//addstudent请求
export function addstudent(params){
    return axios({
        url:'/addstudent',
        method:'post',
        data: params
    })
}


//addcompany请求
export function addcompany(params) {
    return axios({
        url: '/addcompany',
        method: 'post',
        data: params
    })
}

//addPL请求
export function addpl(params) {
    return axios({
        url:'/addpl',
        method: 'post',
        data: params
    })
}

//addJF请求
export function addjf(params) {
    return axios({
        url:'/addjf',
        method: 'post',
        data: params
    })
}
