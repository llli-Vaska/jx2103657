<template>
<!--招聘会发布-->
  <div class="jf">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息发布与管理</el-breadcrumb-item>
      <el-breadcrumb-item>招聘会信息发布</el-breadcrumb-item>
    </el-breadcrumb>


    <el-upload
        class="upload-demo"
        action="http://p373196l49.wicp.vip/upresume"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        multiple
        name="resume"
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>


  </div>
</template>

<script>
export default {
name: "JfPublish",
  data(){
  return{
    fileList: []
  }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

  }
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