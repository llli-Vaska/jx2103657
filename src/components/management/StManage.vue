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
        <el-button type="primary" icon="el-icon-search" class="btn-query">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" class="btn-query">添加</el-button>
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
export default {
name: "StManage",
  data() {
    return {
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      current: 1,
      pageSize: 10,
      total: 50,

      st_number_xh: '',
      st_number_xm: '',
      tableData: [{
        number: '1830630505',
        name: '王小虎',
        sex: '男',
        phone:'15680823501',
        password:'123456',
        department: '计算机系',
        major:'计算机应用技术'
      },


      ],
      // multipleSelection: []
    }
  },
  methods: {
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
  }
}
</script>

<style scoped>
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