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