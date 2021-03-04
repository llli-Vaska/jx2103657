<template>
  <div class="jf">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息发布与管理</el-breadcrumb-item>
      <el-breadcrumb-item>招聘会信息管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form>
      <el-form-item label="搜索:" class="query-form">
        <el-input v-model="jf_name" placeholder="输入招聘会标题" class="bu-query-name"></el-input>
        <el-button type="primary" icon="el-icon-search" class="btn-query" @click="searchname">搜索</el-button>
        <el-button type="danger" icon="el-icon-delete" class="btn-query" @click="BubatchDelete(tableChecked)">批量删除</el-button>
      </el-form-item>
    </el-form>


    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        border
        @selection-change="handleSelectionChange"
    width="100%">
      <el-table-column
          type="selection"
          width="50">
      </el-table-column>
      <el-table-column
          sortable
          prop="JobFireTitle"
          label="招聘会标题"
          width="250">
      </el-table-column>
      <el-table-column
          sortable
          prop="date"
          label="起止时间"
          width="300">
      </el-table-column>
      <el-table-column
          sortable
          prop="address"
          label="具体地址"
          width="180">
      </el-table-column>
      <el-table-column
          sortable
          prop="num1"
          label="招聘企业数"
          width="120"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="num2"
          label="招聘职位数"
          width="120"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="introduction"
          label="招聘会简介"
          width="242"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--分页-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[15, 25, 35]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>

  </div>
</template>

<script>

import {deletejf} from "../../api/deletepl";
import {jfall, jf} from "../../api/select";

export default {
name: "JfManage",
  data() {
  return{
    //分页
    queryInfo: {
      pageNum: 1,
      pageSize: 15
    },
    total:0,
    jf_name:'', //搜索框内容
    //选中
    tableChecked:[],
    // 显示表单信息
    tableData: [{
      JobFireTitle: '',//招聘会标题
      date: '',//起止时间
      address: '',//具体地址
      num1:'',//招聘企业数
      num2:'',//招聘职位数
      introduction: ''//招聘会简介
    }],
    //编辑 删除 暂存空间
    row: {
      JobFireTitle: '',//招聘会标题
      date: '',//起止时间
      address: '',//具体地址
      num1:'',//招聘企业数
      num2:'',//招聘职位数
      introduction: ''//招聘会简介
    },
  }
  },
  mounted() {
    this.getjf()
  },
  watch:{
    jf_name(){
      if (this.jf_name === '') {
        this.getjf()
      }
    }
  },
  methods:{
    //获取jobfair数据
    getjf(){
      jf(this.queryInfo.pageNum,this.queryInfo.pageSize).then(res => {
        this.tableData = res.data
        console.log(this.tableData)
      })
      jfall().then(res => {
        // console.log(res)
        this.total = res.data.length
      })
    },
    //搜索功能
    searchname() {
      console.log(this.pl_name)
      let jf_name = this.jf_name //公司名
      if(jf_name !== '') {
        let searchTableData = this.tableData.filter(item => {
          // console.log(item)
          return item.JobFireTitle.match(jf_name)
        })
        this.tableData = searchTableData
      }else {
        this.getjf()
      }
    },
    //批量删除
    BubatchDelete(val) {
      // console.log(val)
      // console.log(val.length)
      if (val.length) {
        this.$confirm('此操作将删除已勾选信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(let i = 0; i < val.length; i++) {
            deletejf(val[i])
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          setTimeout(() => {
            this.getjf()
          },1000)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    },
    //选中的信息
    handleSelectionChange(val) {
      //选中需要删除的信息
      this.tableChecked = val;
      // console.log(this.tableChecked)
    },
    //单条删除
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(row)
        deletejf(row).then(res =>{
          // console.log(res)
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getjf()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //分页
    //监听尺寸改变
    handleSizeChange(newSize) {
      // console.log(newSize);
      this.queryInfo.pageSize = newSize
      this.getjf()
    },
    //监听页码改变
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.queryInfo.pageNum = newPage
      this.getjf()
    },
  }
}
</script>

<style scoped>
.btn-query {
  margin-left: 15px;
}
.bu-query-name {
  width: 300px;
  padding-left: 10px;
}
.query-form {
  display: flex;
  margin-top: 20px;
}
.jf {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 570px
}
</style>