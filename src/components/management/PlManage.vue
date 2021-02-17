<template>
  <div class="pl">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息发布与管理</el-breadcrumb-item>
      <el-breadcrumb-item>宣讲会信息管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "PlManage"
}
</script>

<style scoped>
.pl {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 570px
}
</style>