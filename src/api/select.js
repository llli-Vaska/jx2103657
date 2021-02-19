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