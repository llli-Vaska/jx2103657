<template>
  <div class="pl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息发布与管理</el-breadcrumb-item>
      <el-breadcrumb-item>宣讲会信息管理</el-breadcrumb-item>
    </el-breadcrumb>
  <el-form>
    <el-form-item label="搜索:" class="query-form">
      <el-input v-model="pl_name" placeholder="输入公司名" class="bu-query-name"></el-input>
      <el-button type="primary" icon="el-icon-search" class="btn-query" @click="searchname">搜索</el-button>
      <el-button type="danger" icon="el-icon-delete" class="btn-query" @click="BubatchDelete(tableChecked)">批量删除</el-button>
    </el-form-item>
  </el-form>

  </div>
</template>

<script>
export default {
  name: "PlManage",
  data(){
    return{
      pl_name:'', //搜索框内容
      //选中
      tableChecked:[],
    }
  },
  methods:{
    //搜索功能
    searchname() {
      console.log(this.pl_name)
    },
    //批量删除
    BubatchDelete(val) {
      console.log(val)
      console.log(val.length)

    },
  }
}
</script>

<style scoped>
.query-form {
  display: flex;
  margin-top: 20px;
}
.pl {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 570px
}
.btn-query {
  margin-left: 15px;
}
.bu-query-name {
  width: 300px;
  padding-left: 10px;
}
</style>