<template>
  <div class="login-container">
    <el-form class="admin-login-form"  ref="form" :rules="rules">
      <el-form-item prop="username">
        <el-input
            prefix-icon="el-icon-user"
            v-model="username"
            placeholder="请输入账号">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            prefix-icon="el-icon-lock"
            v-model="password"
            placeholder="请输入密码"
            show-password>
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
      rules: {
        username: [{required: true, message: '请输入正确的账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入正确的密码', trigger: 'blur'}]
      }

    }
  },
  methods: {
    onAdminLogin() {
      //获取表单数据(根据接口要求绑定数据)
      const username = this.username
      const password = this.password
      const params = {
        username,
        password
      }
      // 表单验证
      // 验证通过，提交登录
      login(params).then(res => {
        if (res.data.code === 0) {
          alert('登陆成功')
        }else{
          console.log('登陆失败')
        }
      console.log(res)
    }).catch(err => {
      console.log(err);
    })
    },

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