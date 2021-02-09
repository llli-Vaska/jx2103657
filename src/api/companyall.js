import axios from "axios";
//company请求
export function companyall() {
    return axios({
        url: '/company',
        method: 'post',

    })
}
//查询公司表