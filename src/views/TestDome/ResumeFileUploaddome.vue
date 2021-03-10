<template>
  <div>
    <p>简历投递测试</p>
    <el-button type="primary" @click="dialogVisible = true" class="btn-query">投递简历</el-button>
    <el-dialog
        title="投递简历"
        :visible.sync="dialogVisible"
        width="30%">
      <div>
        <el-upload
            class="upload-demo"
            action="http://p373196l49.wicp.vip/upresume"
            name="resume"
            :on-success="handleAvatarSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="upload">投递</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

import {resumemessage} from "../../api/upload";

export default {
name: "ResumeFileUploaddome",
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      resumeUrl:'',
      DataForm:{
        number:'1830630612',//用户登录账号
        id:2//该职位id
      }

    };
  },
  methods: {
  //点击投递时触发
    upload(){
      let url = this.resumeUrl //获取文件在服务器的地
      this.dialogVisible = false
      resumemessage(this.DataForm,url).then(res => {
        console.log(res)
        if (res.data.code === 0){
          this.$message({
            message: '简历提交成功',
            type: 'success'
          });
        }else{
          this.$message({
            message: '你已经投递过该职位简历',
            type: 'warning'
          });
        }
      }).then(() =>{
        this.fileList = []
      })
    },
    //文件上传成功时的钩子
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log(file)
      console.log(res)
      this.resumeUrl = res.resumeUrl
    },
    //文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      console.log(file);
    },

    //删除文件之前的钩子
    beforeRemove(file, fileList) {
      console.log(fileList)
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style scoped>
.btn-query {
  margin-left: 15px;
}
</style>