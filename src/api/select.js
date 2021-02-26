import axios from "axios";

export function cpl(offset,limit){
    return axios({
        url:'/cpl',
        method:'post',
        data: {
            offset: offset,
            limit: limit
        }
    })
}

export function cplall() {
    return axios({
        url: '/cplall',
        method: 'post',

    })
}
export function jf(offset,limit){
    return axios({
        url:'/jf',
        method:'post',
        data: {
            offset: offset,
            limit: limit
        }
    })
}

export function jfall() {
    return axios({
        url: '/jfall',
        method: 'post',

    })
}
//position表
export function examine(offset,limit){
    return axios({
        url:'/examine',
        method:'post',
        data: {
            offset: offset,
            limit: limit
        }
    })
}

export function examineall() {
    return axios({
        url: '/position',
        method: 'post',

    })
}