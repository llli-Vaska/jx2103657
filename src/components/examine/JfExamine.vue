<template>
<!--招聘信息审核-->
  <div class="jf">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>招聘信息审核</el-breadcrumb-item>
      <el-breadcrumb-item>信息审核</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
name: "JfExamine"
}
</script>

<style scoped>
.jf {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 570px
}
</style>