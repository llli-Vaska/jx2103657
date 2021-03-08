<!--企业管理-->
<template>
  <div class="bu">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>企业管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form>
      <el-form-item label="搜索:" class="query-form">
        <el-input v-model="bu_name" placeholder="输入公司名" class="bu-query-name"></el-input>
        <el-button type="primary" icon="el-icon-search" class="btn-query" @click="searchname">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" class="btn-query" @click="dialogFormVisible = true">添加</el-button>

        <el-dialog title="添加企业" :visible.sync="dialogFormVisible">
          <el-form :model="form" >
            <el-scrollbar style="height:100%">
              <el-form-item label="公司名:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.CompanyName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="法人代表:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.CompanyPerson" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户名(账号):" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.UserName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.UserPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司介绍:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.Introduce" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司地址:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.CompanyAddress" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司类型:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.CompanyType" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="经营范围:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.Range" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="注册地址:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.RegisteredAddress" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="经营状态:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.Condition" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="成立时间:" :label-width="formLabelWidth" class="dialog-form">
                <el-date-picker
                    v-model="form.Time"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    autocomplete="off">
                </el-date-picker>
<!--                <el-input v-model="form.Time" autocomplete="off"></el-input>-->
              </el-form-item>
              <el-form-item label="注册资本:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.Capital" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司网站:" :label-width="formLabelWidth" class="dialog-form">
                <el-input v-model="form.Website" autocomplete="off"></el-input>
              </el-form-item>

<!--              -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
              <el-form-item>
                <el-upload
                    class="upload-demo1"
                    action="http://p373196l49.wicp.vip/upload"
                    name="fr"
                    :on-success="handleAvatarSuccess1"
                    :on-remove="handleRemove1"
                    :file-list="fileList1"
                    :limit="1"
                    list-type="picture">
                  <el-button size="small" type="primary">点击上传公司图标</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-upload
                    class="upload-demo1"
                    action="http://p373196l49.wicp.vip/upload"
                    name="fr"
                    :on-success="handleAvatarSuccess2"
                    :on-remove="handleRemove2"
                    :file-list="fileList2"
                    :limit="1"
                    list-type="picture">
                  <el-button size="small" type="primary">点击上传公司法人头像</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>

            </el-scrollbar>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddCompany()">确 定</el-button>
          </div>
        </el-dialog>

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
          sortable
          prop="Icon"
          label="公司图标"
          width="110"
          align="center"
          show-overflow-tooltip>
        <template slot-scope="scope">
          <img :src="scope.row.Icon" style= "width: 36px;height:36px">
        </template>
      </el-table-column>
      <el-table-column
          sortable
          prop="CompanyName"
          label="公司名"
          width="120"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="Sculpture"
          label="法人头像"
          width="110"
          align="center"
          show-overflow-tooltip>
        <template slot-scope="scope">
          <img :src="scope.row.Sculpture" style= "width: 36px;height:36px">
        </template>
      </el-table-column>
      <el-table-column
          sortable
          prop="CompanyPerson"
          label="法人代表"
          width="110">
      </el-table-column>
      <el-table-column
          sortable
          prop="UserName"
          label="用户(账号)"
          width="120">
        <template slot-scope="scope">{{ scope.row.UserName }}</template>
      </el-table-column>
      <el-table-column
          sortable
          prop="UserPassword"
          label="密码"
          width="120">
      </el-table-column>

      <el-table-column
          prop="Introduce"
          label="公司介绍"
          width="110"
          show-overflow-tooltip>
      </el-table-column>

      <el-table-column
          sortable
          prop="CompanyAddress"
          label="公司地址"
          width="120"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="CompanyType"
          label="公司类型"
          width="110"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="Range"
          label="经营范围"
          width="120"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="RegisteredAddress"
          label="注册地址"
          width="120"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="Condition"
          label="经营状态"
          width="120"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="Time"
          label="成立时间"
          width="120"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="Capital"
          label="注册资本"
          width="120"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          sortable
          prop="Website"
          label="公司网站"
          width="120"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="scope">
          <el-button
              style="margin-right: 10px"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          <el-dialog title="编辑企业" :visible.sync="dialogFormVisible3" :append-to-body="true">
            <el-form :model="row">
              <el-scrollbar style="height:100%">
                <el-form-item label="公司名:" :label-width="formLabelWidth" class="dialog-form">
                  <el-input v-model="row.CompanyName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="法人代表:" :label-width="formLabelWidth" class="dialog-form">
                  <el-input v-model="row.CompanyPerson" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名(账号):" :label-width="formLabelWidth" class="dialog-form">
                  <el-input v-model="row.UserName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码:" :label-width="formLabelWidth" class="dialog-form">
                  <el-input v-model="row.UserPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="公司介绍:" :label-width="formLabelWidth" class="dialog-form">
                  <el-input v-model="row.Introduce" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="公司地址:" :label-width="formLabelWidth" class="dialog-form">
                  <el-input v-model="row.CompanyAddress" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="公司类型:" :label-width="formLabelWidth" class="dialog-form">
                  <el-input v-model="row.CompanyType" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="经营范围:" :label-width="formLabelWidth" class="dialog-form">
                  <el-input v-model="row.Range" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="注册地址:" :label-width="formLabelWidth" class="dialog-form">
                  <el-input v-model="row.RegisteredAddress" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="经营状态:" :label-width="formLabelWidth" class="dialog-form">
                  <el-input v-model="row.Condition" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="成立时间:" :label-width="formLabelWidth" class="dialog-form">
                  <el-date-picker
                      v-model="row.Time"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      autocomplete="off">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="注册资本:" :label-width="formLabelWidth" class="dialog-form">
                  <el-input v-model="row.Capital" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="公司网站:" :label-width="formLabelWidth" class="dialog-form">
                  <el-input v-model="row.Website" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-upload
                      class="upload-demo1"
                      action="http://p373196l49.wicp.vip/upload"
                      name="fr"
                      :on-success="handleAvatarSuccess1"
                      :on-remove="handleRemove1"
                      :file-list="fileList11"
                      :limit="1"
                      list-type="picture">
                    <el-button size="small" type="primary">点击上传公司图标</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-upload
                      class="upload-demo1"
                      action="http://p373196l49.wicp.vip/upload"
                      name="fr"
                      :on-success="handleAvatarSuccess2"
                      :on-remove="handleRemove2"
                      :file-list="fileList22"
                      :limit="1"
                      list-type="picture">
                    <el-button size="small" type="primary">点击上传公司法人头像</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </el-scrollbar>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible3 = false">取 消</el-button>
              <el-button type="primary" @click="editCompany()">确 定</el-button>
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
import {addcompany} from "../../api/add";
import {companyall} from '../../api/companyall'
import {company} from "../../api/company";
import {deletecompany} from "../../api/deletecompany";
import {deletepicture} from "../../api/deletepicture"
import {editcompany} from "../../api/edit"

export default {
name: "BuManage",
  data() {
  return {
    //分页
    queryInfo: {
      pageNum: 1,
      pageSize: 15
    },
    total:0,

    bu_name:'', //搜索框内容
    dialogFormVisible: false, //添加弹框
    dialogFormVisible3: false, //添加弹框
    // 显示表单信息
    tableData:[ {
      Icon: '', //公司图标
      CompanyName: '', //公司名
      Sculpture: '', //法人代表头像
      CompanyPerson: '', //法人代表
      UserName: '', //账号
      UserPassword: '', //密码
      Introduce: '', //公司介绍
      CompanyAddress: '', //公司地址
      CompanyType: '', //公司类型
      Range: '', //经营范围
      RegisteredAddress: '', //注册地址
      Condition: '', //经营状态
      Time: '', //成立时间
      Capital: '', //注册资本
      Website:'', //公司网站

    }],
    //添加表单
    form: {
      Icon: '', //公司图标
      CompanyName: '', //公司名
      Sculpture: '', //法人代表头像
      CompanyPerson: '', //法人代表
      UserName: '', //账号
      UserPassword: '', //密码
      Introduce: '', //公司介绍
      CompanyAddress: '', //公司地址
      CompanyType: '', //公司类型
      Range: '', //经营范围
      RegisteredAddress: '', //注册地址
      Condition: '', //经营状态
      Time: '', //成立时间
      Capital: '', //注册资本
      Website:'', //公司网站
    },
//编辑 删除 暂存空间
    row: {
      id:'',
      Icon: '', //公司图标
      CompanyName: '', //公司名
      Sculpture: '', //法人代表头像
      CompanyPerson: '', //法人代表
      UserName: '', //账号
      UserPassword: '', //密码
      Introduce: '', //公司介绍
      CompanyAddress: '', //公司地址
      CompanyType: '', //公司类型
      Range: '', //经营范围
      RegisteredAddress: '', //注册地址
      Condition: '', //经营状态
      Time: '', //成立时间
      Capital: '', //注册资本
      Website:'', //公司网站

      },
    //图片修改暂存
    fileList11: [], //公司图标
    fileList22: [], //法人代表头像

    formLabelWidth: '100px',
    //选中
    tableChecked:[],

   //图片上传
    fileList1: [], //公司图标
    fileList2: [], //法人代表头像

  }
  },
  watch: {
    //当公司搜索框无内容时，下方公司信息返回到总页面信息
  bu_name() {
    if (this.bu_name === '') {
      this.getCompany()
    }
  },
    row() {
      if (this.row !== '') {
        //清空上一次的
        this.fileList11 = [],
        this.fileList22 = [],
        this.fileList11.push({
          name: this.row.CompanyName,
          url: this.row.Icon
        })
        this.fileList22.push({
          name: this.row.CompanyPerson,
          url: this.row.Sculpture
        })
      }
    }
  },
  methods: {
  //图片上传
    //公司图标
    handleRemove1(file, fileList) {
      console.log(file, fileList);
      this.form.Icon = ''//删除重置
      deletepicture(file)
    },
    //上传成功 后台返回
    handleAvatarSuccess1(res, file) {
      //res就是后端返回的值
      console.log(file)
      console.log(res)
      this.form.Icon = res.imgUrl
    },
    //法人代表
    handleRemove2(file, fileList) {
      console.log(file, fileList);
      this.form.Sculpture = ''//删除重置
      deletepicture(file)
    },
    // 上传成功 后台返回
    handleAvatarSuccess2(res, file) {
      //res就是后端返回的值
      console.log(file)
      console.log(res)
      this.form.Sculpture = res.imgUrl
    },

    getCompany() {
      company(this.queryInfo.pageNum,this.queryInfo.pageSize).then(res => {
        this.tableData = res.data
        console.log(this.tableData)
      })
      companyall().then(res => {
        // console.log(res.data)
        this.total = res.data.length
      })
  },
  //添加确定
    AddCompany() {
      const form = this.form
      console.log(form)
      addcompany(form).then(res => {
        // console.log(res.data.msg)
        if (res.data.code === 0) {
          this.$message({
            message: '添加成功',
            type: 'success'
          },200);
        }
      })
      setTimeout(() => {
        this.getCompany()
        this.form = {
          Icon: '', //公司图标
          CompanyName: '', //公司名
          Sculpture: '', //法人代表头像
          CompanyPerson: '', //法人代表
          UserName: '', //账号
          UserPassword: '', //密码
          Introduce: '', //公司介绍
          CompanyAddress: '', //公司地址
          CompanyType: '', //公司类型
          Range: '', //经营范围
          RegisteredAddress: '', //注册地址
          Condition: '', //经营状态
          Time: '', //成立时间
          Capital: '', //注册资本
          Website:'', //公司网站
        }
      },1000)
      //关闭对话框
      this.dialogFormVisible = false
    },
  //搜索功能
    searchname() {
      // console.log(this.bu_name)
      let bu_name = this.bu_name //公司名
      if (bu_name !== '') {
        companyall().then(res => {
          this.tableData = res.data
          this.tableData = this.tableData.filter(item => {
            return item.CompanyName.match(bu_name)
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
            deletecompany(val[i])
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          setTimeout(() => {
            this.getCompany()
          },1000)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }


    },
    //编辑修改公司信息
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogFormVisible3 = true
      this.row = row
      console.log(row)
    },
    editCompany(){
      let row = this.row
      editcompany(row).then(res => {
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
      this.dialogFormVisible3 = false
    },
    //删除单条信息
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row)
        deletecompany(row).then(res =>{
          console.log(res)
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getCompany()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //选中的信息
    handleSelectionChange(val) {
      //选中需要删除的信息
      this.tableChecked = val;
      console.log(val)
    },
    //分页
    //监听尺寸改变
    handleSizeChange(newSize) {
      // console.log(newSize);
      this.queryInfo.pageSize = newSize
      this.getCompany()
    },
    //监听页码改变
    handleCurrentChange(newPage) {
      // console.log(newPage);
    this.queryInfo.pageNum = newPage
      this.getCompany()
    },


  },
  mounted() {
    this.getCompany()


  },
}
</script>

<style scoped>


.dialog-form {
  width: 420px;
  margin-bottom: 10px;
}
.bu {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 570px
}
.query-form {
  display: flex;
  margin-top: 20px;
}
.bu-query-name {
  width: 300px;
  padding-left: 10px;
}
.btn-query {
  margin-left: 15px;
}
</style>