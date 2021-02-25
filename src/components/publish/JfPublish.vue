<template>
<!--招聘会发布-->
  <div class="jf">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息发布与管理</el-breadcrumb-item>
      <el-breadcrumb-item>招聘会信息发布</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="form" :model="form" label-width="100px" class="form_write">
      <el-form-item label="招聘会标题">
          <el-input v-model="form.JobFireTitle" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="举办时间">
        <el-date-picker
            v-model="form.date"
            type="datetimerange"
            range-separator="-"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="招聘会地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="招聘企业数">
        <el-input-number v-model="form.num1" controls-position="right" size="small" :min="0" :max="300"></el-input-number>
      </el-form-item>
      <el-form-item label="招聘职位数">
        <el-input-number v-model="form.num2" controls-position="right" size="small" :min="0" :max="300"></el-input-number>
      </el-form-item>
      <el-form-item label="招聘会简介">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" v-model="form.introduction"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>




  </div>
</template>

<script>
import { addjf } from "../../api/add";

export default {
name: "JfPublish",
data() {
  return {
    form: {
      JobFireTitle: '',//招聘会标题
      date: '',//起止时间
      address: '',//具体地址
      num1:'',//招聘企业数
      num2:'',//招聘职位数
      introduction: ''//招聘会简介
    }
  }
},

  methods: {
    onSubmit() {
      console.log('submit!');
      console.log(this.form);
      if (this.form.JobFireTitle === '') {
        this.$message.error('招聘会标题')

      } else if (this.form.date === '') {
        this.$message.error('请填写起止时间')
      } else if (this.form.address === '') {
        this.$message.error('请填写具体地址')
      } else {
        addjf(this.form).then(res => {
          // console.log(res.data.code)
          if (res.data.code === 0) {
            this.$message.success('发布成功！')
          }
        })
        setTimeout(() => {
          this.form = {
            JobFireTitle: '',//招聘会标题
            date: '',//起止时间
            address: '',//具体地址
            num1: '',//招聘企业数
            num2: '',//招聘职位数
            introduction: ''//招聘会简介
          }

          // router.push('/admin/PlManage')
        }, 2000)

      }
    },
  //重置
    resetForm(formName) {
      this[formName] = {
        JobFireTitle: '',//招聘会标题
        date: '',//起止时间
        address: '',//具体地址
        num1: '',//招聘企业数
        num2: '',//招聘职位数
        introduction: ''//招聘会简介
      }
    },
  }

}
</script>

<style scoped>
.form_write {
  margin-top: 25px;
  padding-top: 15px;
  width: 50%;
}
.jf {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 570px
}
</style>