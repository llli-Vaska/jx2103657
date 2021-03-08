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


    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        border
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="50">
      </el-table-column>
      <el-table-column
          label="公司图标"
          align="center"
          width="120">
        <template slot-scope="scope" >
          <img :src="scope.row.Icon" style= "width: 36px;height:36px" alt="">
        </template>
      </el-table-column>
      <el-table-column
          sortable
          prop="CompanyName"
          label="宣讲公司"
          width="200">
      </el-table-column>
      <el-table-column
          sortable
          prop="date"
          label="起止时间"
          width="300">
      </el-table-column>
      <el-table-column
          prop="school"
          label="宣讲学校"
          width="180"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="address"
          label="具体地址"
          width="110">
      </el-table-column>
      <el-table-column
          sortable
          prop="link"
          label="宣讲链接"
          width="150"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="introduction"
          label="宣讲会简介"
          width="180"
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
import {cpl, cplall} from "../../api/select";
import {deletepl} from "../../api/deletepl";



export default {
  name: "PlManage",
  data(){
    return{
      //分页
      queryInfo: {
        pageNum: 1,
        pageSize: 15
      },
      total:0,
      value1:true,
      pl_name:'', //搜索框内容
      //选中
      tableChecked:[],
      // 显示表单信息
      tableData: [{
        Icon:'',//公司图标
        CompanyName:'',//宣讲公司
        'publiclecture.date':'',//起止时间
        school:'',//宣讲学校
        address:'',//宣讲会具体地址
        link:'',//宣讲链接
        introduction:''//宣讲会简介

      }],
      formLabelWidth: '120px',
      //编辑 删除 暂存空间
      row: {
        Icon:'',//公司图标
        CompanyName:'',//宣讲公司
        date:'',//起止时间
        school:'',//宣讲学校
        address:'',//宣讲会具体地址
        link:'',//宣讲链接
        introduction:''//宣讲会简介
      },
    }
  },
  mounted() {
    this.getcpl()
  },
  watch:{
    pl_name(){
      if (this.pl_name === '') {
        this.getcpl()
      }
    }
  },
  methods:{
    //获取company+publiclecture两表的联合查询数据
    getcpl(){
      cpl(this.queryInfo.pageNum,this.queryInfo.pageSize).then(res => {
       this.tableData = res.data
        console.log(this.tableData)
      })
        cplall().then(res => {
          // console.log(res)
          this.total = res.data.length
        })
    },
    //搜索功能
    searchname() {
      // console.log(this.pl_name)
      let pl_name = this.pl_name //公司名
      if (pl_name !== '') {
        cplall().then(res => {
          this.tableData = res.data
          this.tableData = this.tableData.filter(item => {
            return item.CompanyName.match(pl_name)
          })
          this.total = this.tableData.length

        })
      }
    },
    //批量删除
    BubatchDelete(val) {
      console.log(val)
      console.log(val.length)
      if (val.length) {
        this.$confirm('此操作将删除已勾选信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(let i = 0; i < val.length; i++) {
            deletepl(val[i])
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          setTimeout(() => {
            this.getcpl()
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
        console.log(row)
        deletepl(row).then(res =>{
          console.log(res)
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getcpl()
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
      this.getcpl()
    },
    //监听页码改变
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.queryInfo.pageNum = newPage
      this.getcpl()
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