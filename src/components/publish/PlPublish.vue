<template>
<!--宣讲会发布-->
  <div class="pl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息发布与管理</el-breadcrumb-item>
      <el-breadcrumb-item>宣讲会信息发布</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form ref="form" :model="form" label-width="100px" class="form_write">
      <el-form-item label="宣讲公司">
        <el-autocomplete
            class="selectquery"
            v-model="form.CompanyId"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
        ></el-autocomplete>
<!--        <el-input v-model="form.CompanyName"></el-input>-->

      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
            v-model="form.date"
            type="datetimerange"
            range-separator="-"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="宣讲学校">
        <el-input v-model="form.school"></el-input>
      </el-form-item>
      <el-form-item label="宣讲具体地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="宣讲企业链接">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="宣讲会简介">
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
import {companyall} from "@/api/companyall";
import {addpl} from "@/api/add"
import router from "../../router";
export default {
  name: "PlPublish",
  data() {
    return {
      restaurants: [],
      newArr:[],
      timeout:  null,
      state:'',
      form: {
        CompanyId: '',//公司名
        date: '',//起止时间
        school: '',//学校
        address: '',//具体地址
        link:'',//宣讲连接
        introduction: ''//宣讲简介
      }
    }
  },
  methods: {
    //发布
    onSubmit() {
      console.log('submit!');
      console.log(this.form);
      if (this.form.CompanyId === ''){
        this.$message.error('请填写宣讲公司名')

      } else if (this.form.date === ''){
        this.$message.error('请填写起止时间')
      }  else if (this.form.school === '') {
        this.$message.error('请填写宣讲学校')
      } else if (this.form.address === '') {
        this.$message.error('请填写具体地址')
      }else {
        addpl(this.form).then(res => {
          // console.log(res.data.code)
          if (res.data.code === 0) {
            this.$message.success('发布成功！')
          }
        })
        setTimeout(()=> {
          this.form = {
            CompanyId: '',
            date: '',
            school: '',
            address: '',
            link:'',
            introduction: ''
          }, router.push('/admin/PlManage')
        },2000)
      }




    },
    //重置
    resetForm(formName) {
      this[formName] = {
        CompanyId: '',
        date: '',
        school: '',
        address: '',
        link:'',
        introduction: ''
      }
    },


    querySearch(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return this.newArr
    },
    querySearchAsync(queryString, cb) {
      let restaurants = this.restaurants;
      let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 200 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
    //遍历数据库中的公司名
    companyall().then(res => {
      let newArr = this.newArr
      let arr = res.data
      arr.forEach((item) => {
        let obj = {}
        for (let i = 0; i <= arr.length; i++) {
          obj.value = item.CompanyName
        }
        newArr.push(obj)
      })
      // console.log(newArr)
    })
  }
}
</script>

<style scoped>
.selectquery {
  width: 58%;
}
.form_write {
  margin-top: 25px;
  padding-top: 15px;
  width: 50%;
}
.pl {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 570px
}

</style>