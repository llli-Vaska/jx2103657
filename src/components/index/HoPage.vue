<!--首页-->
<template>
<div>
  <a-row type="flex" justify="space-around" style="margin-top: 25px" >
    <a-col :span="4" class="col">
      <img :src="student" alt="" style="width: 70px;height: 70px;margin-top: 12px">
      <div class="count">
        <span style="font-weight: bold">学生总数</span>
        <br>
        <span class="countnumber">{{ StudentNumber }}</span>
      </div>
    </a-col>
    <a-col :span="4" class="col">
      <img :src="company" alt="" style="width: 65px;height: 65px;margin-top: 15px;margin-left: 10px">
      <div class="count">
        <span style="font-weight: bold">公司企业总数</span>
        <br>
        <span class="countnumber">{{ CompanyNumber }}</span>
      </div>
    </a-col>
    <a-col :span="4" class="col">
      <img :src="publiclecture" alt="" style="width: 70px;height: 70px;margin-top: 15px;margin-left: 10px">
      <div class="count">
        <span style="font-weight: bold">宣讲会场数</span>
        <br>
        <span class="countnumber">{{ PublicLecture }}</span>
      </div>
    </a-col>
    <a-col :span="4" class="col">
      <img :src="jobfaire" alt="" style="width: 65px;height:65px;margin-top: 15px;margin-left: 10px">
      <div class="count">
        <span style="font-weight: bold">招聘会场数</span>
        <br>
        <span class="countnumber">{{ JobFaire }}</span>
      </div>
    </a-col>
    <a-col :span="4" class="col">
      <img :src="job" alt="" style="width: 65px;height:65px;margin-top: 15px;margin-left: 10px">
      <div class="count">
        <span style="font-weight: bold">招聘会场数</span>
        <br>
        <span class="countnumber">{{ Job }}</span>
      </div>
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
import {studentall} from "../../api/studentall";
import {companyall} from "../../api/companyall";
import {adoptposition, cplall, jfall} from "../../api/select";

export default {
name: "HoPage",
  data() {
  return{
    student: student,
    company: company,
    publiclecture: publiclecture,
    jobfaire: jobfaire,
    job: job,
    StudentNumber: '',
    CompanyNumber: '',
    PublicLecture: '',
    JobFaire: '',
    Job: '',
  }
  },
  mounted() {
    this.getstudentcount()//获取学生总数
    this.getcompanycount()//获取公司企业总数
    this.getpubliclecturecount()//获取宣讲会场数
    this.getjobfairecount()//获取招聘会场数
    this.getjobcount()//获取招聘职位数
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
    }
  }
}
</script>

<style scoped>
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