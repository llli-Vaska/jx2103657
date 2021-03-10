import axios from "axios";

//添加简历信息到数据库
export function resumemessage(DataForm,resumeUrl){
    return axios({
        url:'/resumemessage',
        method: 'post',
        data:{
            DataForm,
            resumeUrl
        }
    })
}