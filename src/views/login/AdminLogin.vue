<template>
  <div class="login-container">
    <el-form class="admin-login-form"  ref="ruleForm" :rules="rules" :model="ruleForm">
      <el-form-item prop="username">
        <el-input
            prefix-icon="el-icon-user"
            v-model="ruleForm.username"
            placeholder="请输入账号">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            prefix-icon="el-icon-lock"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="types" >
        <el-checkbox label="我已阅读并同意用户协议和隐私条款" v-model="ruleForm.types" ></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="admin-login-btn"
                   type="primary"
                   @click="onAdminLogin('ruleForm')"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {login} from '@/api/login';
export default {
  name: "AdminLogin",
  components: {},
  data() {
    return{
      ruleForm:{
        username:'',//账号
        password:'', //密码
        types: [],
      },
        // checked: true, // 是否同意协议的选中状态
      rules: {
        //表单验证提示
        username: [{required: true, message: '请输入正确的账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入正确的密码', trigger: 'blur'}],
        types: [{ type: 'array', required: true, message: '请勾选', trigger: 'change',}]
      }

    }
  },
  methods: {
    onAdminLogin(formName) {
      //获取表单数据(根据接口要求绑定数据)
      const ruleForm = this.ruleForm
      const params = {
        ruleForm
      }
      //对表单信息进行验证查看是否填写完且是否勾选协议
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 表单验证,验证通过，提交登录
          login(params).then(res => {
            if (res.data.code === 0) {
              // 将token取出，存储到localStorage以及vuex中
              window.localStorage.setItem('username', res.data.username)
              //将token保存到localStorage中
              window.localStorage.setItem('token', res.data.token)
              //将token保存到vuex中
              this.$store.dispatch('setToken', res.data.token)
              this.$store.dispatch('setAdmin', res.data.token)

              this.$message({
                showClose: true,
                message: '登陆成功',
                type: 'success'
              },1000);

              setTimeout(() => {
                    //跳转页面
                      this.$router.push({ path: '/admin' })
                    }, 1500)

              console.log('登陆成功')
            }else{
              console.log('登陆失败')
            }
            console.log(res)
          }).catch(err => {
            console.log(err);
          })
        } else {
          console.log('账号未填写完整!');
          return false;
        }
      });

    },

  },
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