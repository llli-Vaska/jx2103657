import axios from "axios";

export function cpl(offset,limit){
    return axios({
        url:'/cpl',
        method:'post',
        data: {
            offset: (offset - 1) * limit,
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
            offset: (offset - 1) * limit,
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
            offset: (offset - 1) * limit,
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

//指定查询通过审核的position
export function adoptposition() {
    return axios({
        url: '/adoptposition',
        method: 'post'
    })
}
//指定查询通过审核的position 分页
export function adoptpositionpage(offset,limit){
    return axios({
        url:'/adoptpositionpage',
        method:'post',
        data: {
            offset: (offset - 1) * limit,
            limit: limit
        }
    })
}
//指定查询通过审核中的position
export function reviewedposition() {
    return axios({
        url: '/reviewedposition',
        method: 'post'
    })
}
//指定查询通过审核的position page
export function reviewedpositionpage(offset,limit) {
    return axios({
        url: '/reviewedpositionpage',
        method: 'post',
        data: {
            offset: (offset - 1) * limit,
            limit: limit
        }
    })
}
//指定查询审核未通过的position
export function failedposition() {
    return axios({
        url: '/failedposition',
        method: 'post'
    })
}
//指定查询未通过审核中的position page
export function failedpositionpage(offset,limit) {
    return axios({
        url: '/failedpositionpage',
        method: 'post',
        data: {
            offset: (offset - 1) * limit,
            limit: limit
        }
    })
}
//查询各专业
export function selectscale() {
    return axios({
        url: '/selectscale',
        method: 'get'
    })
}