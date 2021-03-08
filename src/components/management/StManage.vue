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
<!--        <el-input v-model="st_number_xh" placeholder="输入学号" class="st-query-xh"></el-input>-->
        <el-input v-model="st_name" placeholder="输入姓名" class="st-query-xm"></el-input>
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

<!--        <el-button type="primary" icon="el-icon-document-add" class="btn-query">批量添加</el-button>-->
<!--        <el-button type="primary" icon="el-icon-document-add" class="btn-query">excel导出</el-button>-->
        <el-button type="danger" icon="el-icon-delete" class="btn-query" @click="batchDelete(tableChecked)">批量删除</el-button>
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
              style="margin-right: 10px"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          <el-dialog title="编辑用户" :visible.sync="dialogFormVisible2" >
            <el-form :model="row">
              <el-form-item label="姓名:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="row.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别:" class="dialog-form-sex">
                <el-radio v-model="row.sex" label="男">男</el-radio>
                <el-radio v-model="row.sex" label="女">女</el-radio>
              </el-form-item>
              <el-form-item label="学号（账号）:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="row.number" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="row.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="登陆密码:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="row.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="系别:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="row.department" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="专业:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="row.major" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="editStudent()">确 定</el-button>
            </div>
          </el-dialog>

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
import {addstudent} from "../../api/add";
import {student} from "../../api/student";
import {deletestudent} from "../../api/deletestudent";
import {editstudent} from "../../api/edit";
import {studentall} from "../../api/studentall";

export default {
name: "StManage",
  data() {
    return {
      //分页
      queryInfo: {
        pageNum: 1,
        pageSize: 15
      },
      total:0,

      // st_number_xh: '',//搜索学号
      st_name: '',//搜索姓名
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
      dialogFormVisible2: false,
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
      row: {
        id:'',
        name: '',
        number: '',
        sex: '男',
        phone: '',
        password:'',
        department: '',
        major: ''
      },
      formLabelWidth: '120px',
      // multipleSelection: [],
      tableChecked:[]
    }
  },
  watch: {
    //当姓名搜索框无内容时，下方学生用户信息返回到总页面信息
    st_name() {
      if (!this.st_name){
        this.getStudent()
      }
    },

  },
  methods: {
  //search
    searchScreen() {
      //搜索框中的关键字
      let st_name = this.st_name //姓名
      if (st_name !== '') {
        studentall().then(res => {
          this.tableData = res.data
          let searchtableData = this.tableData.filter(item => {
                 return item.name.match(st_name)
          })
          this.tableData = searchtableData
          this.total = this.tableData.length

        })
      }
    },
  //添加学生用户到数据库
    AddStudent() {
      const form = this.form
      addstudent(form).then(res => {
        // console.log(res.data.msg)
        if (res.data.code === 0) {
          this.$message({
            message: '添加成功',
            type: 'success'
          },200);
        }
      })
      setTimeout(() => {
        this.getStudent()
       this.form = {
         name: '',
         number: '',
         sex: '男',
         phone: '',
         password:'',
         department: '',
         major: ''
       }
      },1000)
      //关闭对话框
      this.dialogFormVisible = false
    },
    //查询学生表
    getStudent(){
      //获取限制数量的信息
      student(this.queryInfo.pageNum,this.queryInfo.pageSize).then(res => {
        this.tableData = res.data
        // console.log(this.tableData)
      })
      //获取总信息条数
      studentall().then(res => {
        this.total = res.data.length
        // console.log(this.total)
      })
    },

    //分页
    //监听尺寸改变
    handleSizeChange(newSize) {
      // console.log(newSize);
      this.queryInfo.pageSize = newSize
      this.getStudent()
    },
    //监听页码改变
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pageNum = newPage
      // (newPage -1) * this.queryInfo.pageSize
      console.log(this.queryInfo.pageNum)
      this.getStudent()
    },

    //编辑修改学生信息
    handleEdit(index, row) {
      this.dialogFormVisible2 = true
      // console.log(index, row);
      this.row = row
    },
    //提交编辑的学生信息进行修改
    editStudent(){
        let row = this.row
      editstudent(row).then(res => {
        // console.log(res)
        if (res.data.code === 0) {
          this.form = row
          this.$message({
            message: '编辑成功',
            type: 'success'
          },200);
        }
      }).catch(err => {
        console.log(err)
      })
      this.dialogFormVisible2 = false
    },
    //删除单条信息
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletestudent(row).then(res =>{
          // console.log(res)
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getStudent()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //批量删除
    batchDelete(val){
      console.log(val.length)
      if (val.length) {
        this.$confirm('此操作将删除已勾选信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(let i = 0; i < val.length; i++) {
            deletestudent(val[i])
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          setTimeout(() => {
            this.getStudent()
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