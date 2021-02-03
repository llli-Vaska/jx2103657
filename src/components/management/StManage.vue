<!--学生管理-->
<template>
  <div class="st">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form>
      <el-form-item label="搜索:" class="query-form">
        <el-input v-model="st_number_xh" placeholder="输入学号" class="st-query-xh"></el-input>
        <el-input v-model="st_number_xm" placeholder="输入姓名" class="st-query-xm"></el-input>
        <el-button type="primary" icon="el-icon-search" class="btn-query" @click="searchScreen">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" class="btn-query" @click="dialogFormVisible = true">添加</el-button>

          <el-dialog title="添加用户" :visible.sync="dialogFormVisible" >
            <el-form :model="form">
              <el-form-item label="姓名:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别:" class="dialog-form-sex">
                <el-radio v-model="form.sex" label="男">男</el-radio>
                <el-radio v-model="form.sex" label="女">女</el-radio>
              </el-form-item>
              <el-form-item label="学号（账号）:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.number" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="登陆密码:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="系别:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.department" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="专业:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.major" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="AddStudent()">确 定</el-button>
            </div>
          </el-dialog>

        <el-button type="primary" icon="el-icon-document-add" class="btn-query">批量添加</el-button>
        <el-button type="primary" icon="el-icon-document-add" class="btn-query">excel导出</el-button>
        <el-button type="danger" icon="el-icon-delete" class="btn-query">删除</el-button>
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
          sortable
          label="学号(账号)"
          width="150">
        <template slot-scope="scope">{{ scope.row.number }}</template>
      </el-table-column>
      <el-table-column
          sortable
          prop="name"
          label="姓名"
          width="120">
      </el-table-column>
      <el-table-column
          sortable
          prop="sex"
          label="性别"
          width="80">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号"
          width="150"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="password"
          label="登陆密码"
          width="150">
      </el-table-column>
      <el-table-column
          sortable
          prop="department"
          label="系别"
          width="150"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="major"
          label="专业"
          width="150"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <template>
      <a-pagination
          show-overflow-tooltip
          class="paging"
          v-model="current"
          :page-size-options="pageSizeOptions"
          :total="total"
          show-size-changer
          :page-size="pageSize"
          @showSizeChange="onShowSizeChange"
      >
        <template slot="buildOptionText" slot-scope="props">
          <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
          <span v-if="props.value === '50'">全部</span>
        </template>
      </a-pagination>
    </template>
  </div>

</template>

<script>
import {addstudent} from "@/api/addstudent";
import {student} from "@/api/student";

export default {
name: "StManage",
  data() {
    return {
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      current: 1,
      pageSize: 10,
      total: 50,


      st_number_xh: '',//搜索学号
      st_number_xm: '',//搜索姓名
      tableData: [{
        number: '',
        name: '',
        sex: '',
        phone:'',
        password:'',
        department: '',
        major:''
      }],
      dialogFormVisible: false,
      //添加表单
      form: {
        name: '',
        number: '',
        sex: '男',
        phone: '',
        password:'',
        department: '',
        major: ''

      },
      formLabelWidth: '120px'
      // multipleSelection: []

    }
  },
  watch: {
    //当姓名搜索框无内容时，下方学生用户信息返回到总页面信息
    st_number_xm() {
      if (!this.st_number_xm){
        this.getStudent()
      }
    },
    st_number_xh() {
      if (!this.st_number_xh){
        this.getStudent()
      }
    }
  },
  methods: {
  //search
    searchScreen() {
      //搜索框中的关键字
      let st_number_xh = this.st_number_xh //学号
      let st_number_xm = this.st_number_xm
      // console.log(st_number_xm)
      if (!st_number_xh) {
        let searchtableData = this.tableData.filter(item => {
          // console.log(item)
          return item.name.match(st_number_xm)
        })
        // console.log(searchtableData)
        this.tableData = searchtableData
      } else if (!st_number_xm) {
        let searchtableData = this.tableData.filter(item => {
          return item.number.match(st_number_xh)
        })
        // console.log(searchtableData)
        this.tableData = searchtableData
      }

    },
  //添加学生用户到数据库
    AddStudent() {
      const form = this.form
      addstudent(form).then(res => {
        console.log(res.data.msg)
      })
      setTimeout(() => {
        this.getStudent()
      },1000)
      //关闭对话框
      this.dialogFormVisible = false
    },
    //查询学生表
    getStudent(){
      student().then(res => {
        this.tableData = res.data
      })
    },
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
      console.log(this.pageSize)
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  mounted() {
  //将后台数据渲染到页面
    this.getStudent()
  }
}
</script>

<style scoped>
.dialog-form-sex {
  /*margin-bottom: 8px;*/
  margin-left: 77px;
}
.dialog-form {
  width: 420px;
  margin-bottom: 10px;
}
.paging {
  margin-left: 25%;
    margin-top: 20px;

}
.st {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 570px
}
.query-form {
  display: flex;
  margin-top: 20px;
}
.st-query-xh {
  width: 160px;
  padding-left: 10px;
}
.st-query-xm {
  width: 160px;
  margin-left: 15px;
}
.btn-query {
  margin-left: 15px;
}
</style>