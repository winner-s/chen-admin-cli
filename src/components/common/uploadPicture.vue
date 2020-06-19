<!-- 
   element图片上传封装组件
  -->
<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :on-error="handleAvatarError"
      :http-request="submitUploadImgUrl"
      accept="image/jpeg,image/jpg,image/png"
      :disabled="disabled"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div slot="tip" class="upload__tip">
        提示：只能上传jpeg/jpg/png格式，且不超过5Mb
      </div>
    </el-upload>
  </div>
</template>
<script>
import { uploadPictureApi } from "@s/api";
export default {
  name: "uploadPicture",
  data() {
    return {
      imageUrl: ""
    };
  },
  props: ["imageValue", "disabled"],
  watch: {
    imageValue(val) {
      this.imageUrl = val;
    }
  },
  mounted() {
    this.imageUrl = this.imageValue;
  },
  methods: {
    submitUploadImgUrl(uploader) {
      //  图片不做处理的方式
      let form = new FormData();
      form.append("file", uploader.file);
      uploadPictureApi(form).then(res => {
        console.log(res);
        this.imageUrl = res;
        this.$emit("handleSuccess", this.imageUrl);
        //上传成功
        //处理自己的逻辑
        this.$message({
          type: "success",
          message: "上传成功！"
        });
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpg";
      const isJPEG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isJPG && !isJPEG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG、JPEG、PNG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return (isJPG || isJPEG || isPNG) && isLt5M;
    },
    handleAvatarError() {
      this.$message({
        type: "error",
        message: "上传错误！"
      });
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
