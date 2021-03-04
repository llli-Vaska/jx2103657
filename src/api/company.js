import axios from "axios";
//company请求
export function company(offset,limit){
    return axios({
        url:'/companypage',
        method:'post',
        data: {
            offset: (offset - 1) * limit,
            limit: limit
        }
    })
}
//公司分页