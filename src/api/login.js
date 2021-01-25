import axios from "axios";

function login(params){
    return axios({
        url:'/adminlogin',
        method:'post',
        params: params
    })
}
module.exports = login