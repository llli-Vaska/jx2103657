<!--首页-->
<template>
<div>
  <a-row  style="margin-top: 30px" >
    <a-col  :xs="23" :md="4" class="col1 ">
      <el-card shadow="hover" style="height: 100px">
      <img :src="student" alt="" style="width: 70px;height: 70px;margin-top: -8px;margin-left: -17px">
      <div class="count">
        <span style="font-weight: bold">学生总数</span>
        <br>
        <span class="countnumber">{{ StudentNumber }}</span>
      </div>
      </el-card>
    </a-col>
    <a-col  :xs="23" :md="4" class="col1">
      <el-card shadow="hover" style="height: 100px">
      <img :src="company" alt="" style="width: 65px;height: 65px;margin-top: -3px;margin-left: -7px">
      <div class="count">
        <span style="font-weight: bold">公司企业总数</span>
        <br>
        <span class="countnumber">{{ CompanyNumber }}</span>
      </div>
      </el-card>
    </a-col>
    <a-col  :xs="23" :md="4" class="col1">
      <el-card shadow="hover" style="height: 100px">
      <img :src="publiclecture" alt="" style="width: 70px;height: 70px;margin-top: -3px;margin-left: -8px">
      <div class="count">
        <span style="font-weight: bold">宣讲会场数</span>
        <br>
        <span class="countnumber">{{ PublicLecture }}</span>
      </div>
      </el-card>
    </a-col>
    <a-col  :xs="23" :md="4" class="col1">
      <el-card shadow="hover" style="height: 100px">
      <img :src="jobfaire" alt="" style="width: 65px;height:65px;margin-top: -3px;margin-left: -8px">
      <div class="count">
        <span style="font-weight: bold">招聘会场数</span>
        <br>
        <span class="countnumber">{{ JobFaire }}</span>
      </div>
      </el-card>
    </a-col>
    <a-col  :xs="23" :md="4" class="col1">
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
  <a-row style="margin-top: 25px">
    <a-col :xs="23" :md="7" class="col">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 15px;font-weight: bolder">招聘职位信息审核</span>
        </div>
        <router-link to="/admin/JfExamine">
        <div class="msgbox">
          <img :src="adopt" alt="" style="margin-top: 10px;margin-left: 10px">
          <div class="msgbox_message">
            <span style="font-size: 20px;letter-spacing: 2px;font-weight: normal;color: green;line-height: 70px">审核通过数:</span>
            <span style="padding-left: 80px;color: green;font-size: 20px;font-weight: bold">{{ Job }}</span>
          </div>
        </div>
        </router-link>
        <router-link to="/admin/JfExamine">
          <div class="msgbox">
            <img :src="reviewed" alt="" style="margin-top: 10px;margin-left: 13px">
            <div class="msgbox_message">
              <span style="font-size: 20px;letter-spacing: 2px;font-weight: normal;color: orange;line-height: 70px">待审核数:</span>
              <span style="padding-left: 100px;color: orange;font-size: 20px;font-weight: bold">{{ Reviewed }}</span>
            </div>
          </div>
        </router-link>
        <router-link to="/admin/JfExamine">
          <div class="msgbox">
            <img :src="failed" alt="" style="margin-top: 13px;margin-left: 13px">
            <div class="msgbox_message">
              <span style="font-size: 20px;letter-spacing: 2px;font-weight: normal;color: palevioletred;line-height: 70px">未通过审核数:</span>
              <span style="padding-left: 55px;color: palevioletred;font-size: 20px;font-weight: bold">{{ Failed }}</span>
            </div>
          </div>
        </router-link>
      </el-card>
    </a-col>
    <a-col :xs="23" :md="3" class="col">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 15px;font-weight: bolder">待审核信息剩余</span>
        </div>
        <div id="liquid"></div>
      </el-card>
    </a-col>
    <a-col :xs="23" :md="12" class="col">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 15px;font-weight: bolder">信息监控分析</span>
        </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
        <el-tab-pane label="各院系人数比例" name="first">
          <div id="pie"></div>
        </el-tab-pane>
        <el-tab-pane label="男女比例" name="second">
          <div id="PieSex"></div>
        </el-tab-pane>

      </el-tabs>

      </el-card>
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
import {studentall, studentsexman, studentsexwoman} from "../../api/studentall";
import {companyall} from "../../api/companyall";
import {adoptposition, cplall, jfall, reviewedposition, failedposition, selectscale} from "../../api/select";
import { Liquid,Pie } from '@antv/g2plot';
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
    Job: Number,
    Reviewed: Number,//审核中的数
    Failed: Number,
    CountPercent:Number,//百分比
    activeName: 'first',
    scale:[{
      type:String,
      value:Number,
    }],

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
    setTimeout(() => {
      this.conutpercent()//水波图
      this.getmajor()//获取各院系人数比例饼状图
      this.getSex()//饼状图
    },200)



  },
  methods: {
  //男女比例
    getSex(){
      studentsexman().then(res => {
        console.log(res.data.length)
        this.mannum = res.data.length
      })
      studentsexwoman().then(res => {
        console.log(res.data.length)
        this.womannum = res.data.length
      })
      setTimeout(()=> {
        const data = [
          { type: '男', value: this.mannum },
          { type: '女', value: this.womannum },
        ];
        const piePlot = new Pie('PieSex', {
          data,
          angleField: 'value',
          colorField: 'type',
          radius: 0.75,
          label: {
            type: 'spider',
            labelHeight: 28,
            content: '{name}\n{percentage}',
          },
          interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
        });
        piePlot.update({ "theme": { "styleSheet": { "brandColor": "#5B8FF9", "paletteQualitative10": ["#5B8FF9", "#61DDAA", "#65789B", "#F6BD16", "#7262fd", "#78D3F8", "#9661BC", "#F6903D", "#008685", "#F08BB4"], "paletteQualitative20": ["#5B8FF9", "#CDDDFD", "#61DDAA", "#CDF3E4", "#65789B", "#CED4DE", "#F6BD16", "#FCEBB9", "#7262fd", "#D3CEFD", "#78D3F8", "#D3EEF9", "#9661BC", "#DECFEA", "#F6903D", "#FFE0C7", "#008685", "#BBDEDE", "#F08BB4", "#FFE0ED"] } } });
        piePlot.render();
      },100)



    },
  //专业type
  getmajor(){
    selectscale().then(res => {
      // console.log(res.data)
      for (let i =0;i<= res.data.length-1;i++){
        for (let j =0;j<= res.data.length-1;j++) {
          this.scale[i] = {...res.data[i][0]}
        }
      }
      // console.log(this.scale)
      const data = this.scale;
      const piePlot = new Pie('pie', {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        label: {
          type: 'spider',
          labelHeight: 28,
          content: '{name}\n{percentage}',
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
      });
      piePlot.update({ "theme": { "styleSheet": { "brandColor": "#5B8FF9", "paletteQualitative10": ["#5B8FF9", "#61DDAA", "#65789B", "#F6BD16", "#7262fd", "#78D3F8", "#9661BC", "#F6903D", "#008685", "#F08BB4"], "paletteQualitative20": ["#5B8FF9", "#CDDDFD", "#61DDAA", "#CDF3E4", "#65789B", "#CED4DE", "#F6BD16", "#FCEBB9", "#7262fd", "#D3CEFD", "#78D3F8", "#D3EEF9", "#9661BC", "#DECFEA", "#F6903D", "#FFE0C7", "#008685", "#BBDEDE", "#F08BB4", "#FFE0ED"] } } });
      piePlot.render();
    })
  },
    // 待审核信息剩余百分数
  conutpercent(){
      this.CountPercent = this.Reviewed  / (this.Job + this.Reviewed + this.Failed)
        // console.log(this.CountPercent)
        const liquidPlot = new Liquid('liquid',{
        percent: this.Reviewed  / (this.Job + this.Reviewed + this.Failed),
      });
    console.log(this.CountPercent)
      liquidPlot.render();
  },
    handleClick(tab,event) {
      console.log(tab);
      console.log(event)
    },
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
    //获取招聘职位数(审核通过)
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
.tab{
  margin-top: -20px;
}
#pie {
  padding: 0;
}
#liquid {
  width: 100%;
  height: 260px;
}
.msgbox_message {
  width: 70%;
  height: 68px;
  position: absolute;
  right: 0;
  top: 0;
}
.msgbox {
  width: 100%;
  height: 70px;
  position: relative;
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
.col1{
  background-color: #FFFFFF;
  /*height: 100px;*/
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-left: 1.5%;
  margin-right: 1.5%;
  margin-bottom: 10px;
}
.col{
  background-color: #FFFFFF;
  /*height: 100px;*/
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-left: 1.5%;
  margin-bottom: 20px;
}

</style>