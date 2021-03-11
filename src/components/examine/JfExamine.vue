<template>
<!--招聘信息审核-->
  <div class="jf">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>招聘信息审核</el-breadcrumb-item>
      <el-breadcrumb-item>信息审核</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form>
      <el-form-item label="搜索:" class="query-form">
        <el-input v-model="jfe_name" placeholder="输入公司名" class="bu-query-name"></el-input>
        <el-button type="primary" icon="el-icon-search" class="btn-query" @click="searchname">搜索</el-button>
        <el-button type="danger" icon="el-icon-delete" class="btn-query" @click="BubatchDelete(tableChecked)">批量删除</el-button>
        <el-button icon="el-icon-refresh" type="success"  alt="刷新" @click="refresh()">刷新</el-button>

      </el-form-item>
    </el-form>

    <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.05);"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        border
        @selection-change="handleSelectionChange"
        @filter-change="filterTagTable"

    >
      <el-table-column
          type="selection"
          width="50">
      </el-table-column>
      <el-table-column
          sortable
          prop="CompanyName"
          label="公司名"
          width="200">
      </el-table-column>
      <el-table-column
          sortable
          prop="TitlePosition"
          label="职位名"
          width="300">
      </el-table-column>
      <el-table-column
          prop="state"
          label="审核状态"
          width="120"
          :filter-multiple="false"
          :filters="[{ text: '申请中', value: '申请中' }, { text: '审核通过', value: '审核通过' },{ text: '未通过审核', value: '未通过审核' },]"
          :filter-method="filterTag"
          column-key="aStatus"
          filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
              v-if="scope.row.state === '申请中'"
              :type="'primary'"
              disable-transitions>{{scope.row.state}}</el-tag>
          <el-tag
              v-else-if="scope.row.state === '审核通过'"
              :type="'success'"
              disable-transitions>{{scope.row.state}}</el-tag>
          <el-tag
              v-else-if="scope.row.state === '未通过审核'"
              :type="'danger'"
              disable-transitions>{{scope.row.state}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="Degree"
          label="学历要求"
          width="160"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="Salary"
          label="薪资"
          width="120">
      </el-table-column>
      <el-table-column
          sortable
          prop="Technology"
          label="技术要求"
          width="180"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="Welfare"
          label="福利待遇"
          width="150"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="Duty"
          label="工作职责"
          width="180"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        sortable
        prop="Region"
        label="公司所在区域"
        width="180"
        show-overflow-tooltip>
    </el-table-column>
      <el-table-column
          sortable
          prop="Number"
          label="招收人数"
          width="150"
          show-overflow-tooltip>
      </el-table-column>

      <el-table-column label="操作" width="260" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              @click="handleAdopt(scope.$index, scope.row)">通过审核</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleRefuse(scope.$index, scope.row)">拒绝申请</el-button>
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


import {
  adoptposition,
  adoptpositionpage,
  examine,
  examineall,
  failedposition,
  failedpositionpage,
  reviewedposition,
  reviewedpositionpage
} from "../../api/select";
import {deletejfe} from "../../api/deletepl";
import {adoptrefuse} from "../../api/edit";


export default {
name: "JfExamine",
  data() {
    return {
      //分页
      queryInfo: {
        pageNum: 1,
        pageSize: 15
      },
      total:0,
      jfe_name: '',
      //选中
      tableChecked:[],
      // options: [{
      //   value: '选项1',
      //   label: '申请中'
      // }, {
      //   value: '选项2',
      //   label: '通过审核'
      // }, {
      //   value: '选项3',
      //   label: '审核拒绝'
      // }],
      value: '',
      // 显示表单信息
      tableData: [{
       TitlePosition: '',//职位名
        CompanyName: '',//公司名
        Degree: '',//学历要求
        Salary: '',//薪资
        Welfare: '',//福利待遇
        Technology: '',//技术要求
        Duty: '',//工作职责
        Region: '',//公司所在区域
        Number: '',//招收人数
        state:''//审核状态（0：未通过审核 1：通过审核 2:申请中）
      }],
      //编辑 删除 暂存空间
      row: {
        TitlePosition: '',//职位名
        CompanyName: '',//公司名
        Degree: '',//学历要求
        Salary: '',//薪资
        Welfare: '',//福利待遇
        Technology: '',//技术要求
        Duty: '',//工作职责
        Region: '',//公司所在区域
        Number: '',//招收人数
        state:''//审核状态（0：未通过审核 1：通过审核 2:审核中）
      },
      loading: false,
      status:''
    }
  },
  mounted() {
    this.getexamine()
  },
  watch:{
    jfe_name(){
      if (this.jfe_name === '') {
        this.getexamine()
      }
    },
    status(val){
      // console.log(val)
      // console.log(this.state)
      if (val === '审核通过'){
        this.status === '审核通过'
        setTimeout(()=>{
          this.successmsg()
        },100)

      }else if (val === '申请中'){
        this.status === '申请中'
        setTimeout(()=>{
          this.applymsg()
        },100)

      }else if (val ==='未通过审核'){
        this.status === '未通过审核'
        setTimeout(()=>{
          this.faildmasg()
        },100)

      }else{
        this.filterTagTable()
      }
    }
  },
  methods: {
    // tag过滤筛选
    filterTag(value, row) {
      this.status = value
      return row.state === value;
    },
    //筛选未通过信息
    faildmasg(){
      failedpositionpage(this.queryInfo.pageNum,this.queryInfo.pageSize).then(res => {
        this.tableData = res.data
      })
      failedposition().then(res => {
        this.total = res.data.length
      })
    },
    //筛选审核通过信息
    successmsg(){
      adoptpositionpage(this.queryInfo.pageNum,this.queryInfo.pageSize).then(res => {
        this.tableData = res.data
      })
      adoptposition().then(res => {
        this.total = res.data.length
        // console.log(res)
      })
    },
    //筛选申请中信息
    applymsg(){
      reviewedpositionpage(this.queryInfo.pageNum,this.queryInfo.pageSize).then(res => {
        this.tableData = res.data
      })
      reviewedposition().then(res => {
        this.total = res.data.length
      })
    },
    filterTagTable(filters){
      // console.log(filters.aStatus)
      if (filters.aStatus !== undefined){
        this.getexamine()
      }
    },
    refresh() {
      this.loading = true
      setTimeout(() => {
        setTimeout(() => {
          this.getexamine()
        },120)
        this.loading = false
      },700)
    },
    //获取company+publiclecture两表的联合查询数据
    getexamine(){
      examine(this.queryInfo.pageNum,this.queryInfo.pageSize).then(res => {
        this.tableData = res.data
        // console.log(this.tableData)
      })
      examineall().then(res => {
        // console.log(res)
        this.total = res.data.length
      })
    },


    //选中的信息
    handleSelectionChange(val) {
      //选中需要删除的信息
      this.tableChecked = val;
      // console.log(this.tableChecked)
    },
    //搜索功能
    searchname() {
      console.log(this.jfe_name)
      let jfe_name = this.jfe_name //公司名
      if (jfe_name !== '') {
        examineall().then(res => {
          this.tableData = res.data
          this.tableData = this.tableData.filter(item => {
            return item.CompanyName.match(jfe_name)
          })
          this.total = this.tableData.length

        })
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
            deletejfe(val[i])
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          setTimeout(() => {
            this.getexamine()
          },1000)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    },
    //单条删除
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(row)
        deletejfe(row).then(res =>{
          // console.log(res)
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getexamine()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //通过审核
    handleAdopt(index, row) {
      // console.log(index, row);
      row.state = '审核通过'
      adoptrefuse(row).then(res => {
        // console.log(res)
        if (res.data.code === 0) {
          this.form = row
          this.$message({
            message: '审核成功',
            type: 'success'
          },200);
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //拒绝审核
    handleRefuse(index, row) {
      // console.log(index, row);
      row.state = '未通过审核'
      adoptrefuse(row).then(res => {
        // console.log(res)
        if (res.data.code === 0) {
          this.form = row
          this.$message({
            message: '审核成功',
            type: 'success'
          },200);
        }
      }).catch(err => {
        console.log(err)
      })
    },
    //分页
    //监听尺寸改变
    handleSizeChange(newSize) {
      // console.log(newSize);
      this.queryInfo.pageSize = newSize
      if (this.status === '审核通过') {
          this.successmsg()
      }else if (this.status === '申请中'){
        this.applymsg()
      }else if (this.status === '未通过审核') {
        this.faildmasg()
      }
      else{
        this.getexamine()
      }

    },
    //监听页码改变
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.queryInfo.pageNum = newPage
      if (this.status === '审核通过'){
        this.successmsg()
      }else if (this.status === '申请中'){
        this.applymsg()
      }else if (this.status === '未通过审核') {
        this.faildmasg()
      }
      else{
        this.getexamine()
      }
    },
  }
}
</script>

<style scoped>
.query-form {
  display: flex;
  margin-top: 20px;
}
.btn-query {
  margin-left: 15px;
}
.bu-query-name {
  width: 300px;
  padding-left: 10px;
}
.jf {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 570px
}
/*.examineselect {*/
/*  width: 20%;*/
/*  margin-left: 2%;*/
/*}*/
</style>