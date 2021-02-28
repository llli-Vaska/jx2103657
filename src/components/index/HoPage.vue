<!--首页-->
<template>
<div>
  <a-row type="flex" justify="space-around" style="margin-top: 30px" >
    <a-col :span="4" class="col">
      <el-card shadow="hover" style="height: 100px">
      <img :src="student" alt="" style="width: 70px;height: 70px;margin-top: -8px;margin-left: -17px">
      <div class="count">
        <span style="font-weight: bold">学生总数</span>
        <br>
        <span class="countnumber">{{ StudentNumber }}</span>
      </div>
      </el-card>
    </a-col>
    <a-col :span="4" class="col">
      <el-card shadow="hover" style="height: 100px">
      <img :src="company" alt="" style="width: 65px;height: 65px;margin-top: -3px;margin-left: -7px">
      <div class="count">
        <span style="font-weight: bold">公司企业总数</span>
        <br>
        <span class="countnumber">{{ CompanyNumber }}</span>
      </div>
      </el-card>
    </a-col>
    <a-col :span="4" class="col">
      <el-card shadow="hover" style="height: 100px">
      <img :src="publiclecture" alt="" style="width: 70px;height: 70px;margin-top: -3px;margin-left: -8px">
      <div class="count">
        <span style="font-weight: bold">宣讲会场数</span>
        <br>
        <span class="countnumber">{{ PublicLecture }}</span>
      </div>
      </el-card>
    </a-col>
    <a-col :span="4" class="col">
      <el-card shadow="hover" style="height: 100px">
      <img :src="jobfaire" alt="" style="width: 65px;height:65px;margin-top: -3px;margin-left: -8px">
      <div class="count">
        <span style="font-weight: bold">招聘会场数</span>
        <br>
        <span class="countnumber">{{ JobFaire }}</span>
      </div>
      </el-card>
    </a-col>
    <a-col :span="4" class="col">
      <el-card shadow="hover" style="height: 100px">
      <img :src="job" alt="" style="width: 65px;height:65px;margin-top: -3px;margin-left: -15px">
      <div class="count">
        <span style="font-weight: bold">招聘职位数</span>
        <br>
        <span class="countnumber">{{ Job }}</span>
      </div>
      </el-card>
    </a-col>
  </a-row>
  <a-row type="flex" justify="space-around" style="margin-top: 25px;" >
    <a-col :span="7" class="col">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 15px;font-weight: bolder">招聘职位信息审核</span>
        </div>
        <router-link to="/admin/JfExamine">
        <div class="msgbox">
          <img :src="adopt" alt="" style="margin-top: 10px;margin-left: 10px">
          <div class="msgbox_message1">
            <span style="font-size: 20px;letter-spacing: 2px;font-weight: normal;color: green">审核通过数:</span>
            <span style="padding-left: 80px;color: green;font-size: 20px;font-weight: bold">{{ Job }}</span>
          </div>
        </div>
        </router-link>
        <router-link to="/admin/JfExamine">
          <div class="msgbox">
            <img :src="reviewed" alt="" style="margin-top: 10px;margin-left: 13px">
            <div class="msgbox_message2">
              <span style="font-size: 20px;letter-spacing: 2px;font-weight: normal;color: orange">待审核数:</span>
              <span style="padding-left: 100px;color: orange;font-size: 20px;font-weight: bold">{{ Reviewed }}</span>
            </div>
          </div>
        </router-link>
        <router-link to="/admin/JfExamine">
          <div class="msgbox">
            <img :src="failed" alt="" style="margin-top: 13px;margin-left: 13px">
            <div class="msgbox_message3">
              <span style="font-size: 20px;letter-spacing: 2px;font-weight: normal;color: palevioletred">未通过审核数:</span>
              <span style="padding-left: 60px;color: palevioletred;font-size: 20px;font-weight: bold">{{ Failed }}</span>
            </div>
          </div>
        </router-link>

      </el-card>
    </a-col>
    <a-col :span="3" class="col">

    </a-col>
    <a-col :span="12" class="col">

    </a-col>
  </a-row>
</div>
</template>

<script>
import student from '@/assets/index/学生.png'
import company from '@/assets/index/企业.png'
import publiclecture from '@/assets/index/线上宣讲会big.png'
import jobfaire from '@/assets/index/招聘会-选中.png'
import job from '@/assets/index/职位.png'
import adopt from '@/assets/index/审核(通过).png'
import reviewed from '@/assets/index/审核中.png'
import failed from '@/assets/index/审核未通过.png'
import {studentall} from "../../api/studentall";
import {companyall} from "../../api/companyall";
import {adoptposition, cplall, jfall,reviewedposition,failedposition} from "../../api/select";

export default {
name: "HoPage",
  data() {
  return{
    student: student,
    company: company,
    publiclecture: publiclecture,
    jobfaire: jobfaire,
    job: job,
    adopt: adopt,
    reviewed: reviewed,
    failed: failed,
    StudentNumber: '',
    CompanyNumber: '',
    PublicLecture: '',
    JobFaire: '',
    Job: '',
    Reviewed: '',
    Failed: '',
  }
  },
  mounted() {
    this.getstudentcount()//获取学生总数
    this.getcompanycount()//获取公司企业总数
    this.getpubliclecturecount()//获取宣讲会场数
    this.getjobfairecount()//获取招聘会场数
    this.getjobcount()//获取招聘职位数
    this.getreviewedcount()//获取审核中的数
    this.getfailedcount()//获取审核未通过的数
  },
  methods: {
  //获取学生总数
  getstudentcount() {
    studentall().then(res => {
      this.StudentNumber = res.data.length
    })
  },
  //获取公司企业总数
    getcompanycount() {
    companyall().then(res => {
      this.CompanyNumber = res.data.length
    })
    },
    //获取宣讲会场数
    getpubliclecturecount() {
    cplall().then(res => {
      // console.log(res.data.length)
      this.PublicLecture = res.data.length
    })
    },
    //获取招聘会场数
    getjobfairecount() {
    jfall().then(res => {
      this.JobFaire = res.data.length
    })
    },
    //获取招聘职位数
    getjobcount() {
    adoptposition().then(res => {
      this.Job  =res.data.length
    })
    },
    //获取审核中的数
    getreviewedcount() {
      reviewedposition().then(res => {
        this.Reviewed  =res.data.length
      })
    },
    //获取审核未通过的数
    getfailedcount() {
      failedposition().then(res => {
        this.Failed  =res.data.length
      })
    }
  }
}
</script>

<style scoped>
.msgbox_message1 {
  width: 300px;
  height: 68px;
  position: absolute;
  right: 20px;
  top: 100px;
}
.msgbox_message2{
  width: 300px;
  height: 68px;
  position: absolute;
  right: 20px;
  top: 190px;
}
.msgbox_message3 {
  width: 300px;
  height: 68px;
  position: absolute;
  right: 20px;
  top: 280px;
}
.msgbox {
  width: 100%;
  height: 70px;
  border-radius: 2px;
  margin-bottom: 18px;
  background-color: #F8F8F8;
  cursor: pointer;
}
.msgbox:hover {
 background-color: #F2F2F2;
  transition:.3s;
}
.countnumber {
 position: absolute;
  top: 40px;
  right: 35px;
  font-size: 24px;
}
.count {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 15px;
  padding-right: 18px;
}
.col{
  background-color: #FFFFFF;
  height: 100px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px
}
</style>