<template>
  <div class="login-container">
    <el-form class="admin-login-form" ref="form">
      <el-form-item >
        <el-input
            v-model="username"
            placeholder="请输入账号">
        </el-input>
      </el-form-item>
      <el-form-item >
        <el-input
            v-model="password"
            placeholder="请输入密码">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked"></el-checkbox>
        我已阅读并同意用户协议和隐私条款
      </el-form-item>
      <el-form-item>
        <el-button class="admin-login-btn"
                   type="primary"
                   @click="onAdminLogin"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {login} from '@/api/login';
export default {
  name: "AdminLogin",
  comments: {},
  data() {
    return{
        username:'',//账号
        password:'', //密码
      checked: false, // 是否同意协议的选中状态
    }
  },
  methods: {
    onAdminLogin() {
      const username = this.username
      const password = this.password
      const params = {
        username,
        password
      }
      //获取表单数据(根据接口要求绑定数据)
      // 表单验证
      // 验证通过，提交登录
      login(params).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err);
    })
      // 处理后端响应结果
      //   成功：xxx
      //   失败：xxx
    }
  },
  mounted() {
    const username = this.username
    console.log(username)
  }
}

</script>

<style scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  /*实现水平垂直居中*/
  display: flex;
  /*排列方式——上下*/
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /*登录背景*/
  background: url("./adminlogin_bg.jpeg") no-repeat;
  background-size: cover;
}
.admin-login-form {
  background-color: #fff;
  padding: 50px;
  min-width: 300px;
}
.admin-login-btn {
  width: 100%;
}

</style>