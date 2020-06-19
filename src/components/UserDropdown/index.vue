<template>
  <div>
    <el-dropdown class="userDd">
      <div class="userDrop">
        <span class="userDrop_text"
          >{{ userInfo ? JSON.parse(userInfo).sysAccount : ""
          }}<i class="el-icon-caret-bottom"></i
        ></span>
        <img src="./user01.jpg" alt="user" />
      </div>
      <el-dropdown-menu solt="dropdown">
        <el-dropdown-item>
          <router-link to="/"><i class="el-icon-s-home"></i>首页</router-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="updatePasswordClick()">
            <i class="el-icon-s-custom"></i>修改密码</span
          >
        </el-dropdown-item>
        <el-dropdown-item>
          <a @click="_loginOut()"><i class="el-icon-switch-button"></i>登出</a>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
      :title="dialogUserInfo.title"
      append-to-body
      :visible.sync="dialogUserInfo.show"
      :close-on-click-modal="false"
      width="800px"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        :rules="rules"
        :disabled="dialogUserInfo.read"
        v-if="dialogUserInfo.show"
      >
        <el-form-item label="账号：" prop="loginAccount" disabled>
          <el-input
            v-model="form.loginAccount"
            style="width:200px;"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="原密码：" prop="oldPassword">
          <el-input
            v-model="form.oldPassword"
            style="width:200px;"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="sysPassword">
          <el-input
            v-model="form.sysPassword"
            style="width:200px;"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            style="width:200px;"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sub" size="mini">修改</el-button>
        <el-button @click="dialogUserInfo.show = false" size="mini"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { _debounce } from "@u/debounce";
// import { updateUserPwdApi } from "@s/api";
export default {
  data() {
    let reg = /^(\w){6,20}$/;
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入6-20个字母、数字、下划线"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入6-20个字母、数字、下划线"));
      } else {
        if (this.form.confirmPassword !== "") {
          this.$refs.form.validateField("confirmPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.sysPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogUserInfo: {
        title: "",
        show: false
      },
      form: {
        loginAccount: "",
        confirmPassword: "",
        sysPassword: "",
        oldPassword: ""
      },
      rules: {
        sysPassword: [{ validator: validatePass, trigger: "blur" }],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }],
        oldPassword: [{ validator: validateOldPass, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    // window.console.log(
    //   JSON.parse(this.userInfo),
    //   this.$store.state.user.showRoles
    // );
  },
  methods: {
    updatePasswordClick() {
      this.dialogUserInfo.title = "修改密码";
      this.form.loginAccount = this.userInfo
        ? JSON.parse(this.userInfo).sysAccount
        : "";
      this.dialogUserInfo.show = true;
    },
    _loginOut() {
      this.$confirm("确定退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "退出成功！"
        });
        this.$store.dispatch("user/delToken");
        this.$store.dispatch("permission/delIsFindRouter");
        this.$router.push({ name: "login" });
      });
    },
    sub: _debounce(function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.updateSub();
        }
      });
    }),
    updateSub() {
      let json = {
        oldPassword: this.form.oldPassword,
        sysPassword: this.form.sysPassword
      };
      // updateUserPwdApi(json).then(() => {
      //   this.$alert("密码修改成功，请重新登录！", "提示", {
      //     confirmButtonText: "确定",
      //     callback: () => {
      //       this.dialogUserInfo.show = false;
      //       this.$store.dispatch("user/delToken");
      //       this.$store.dispatch("permission/delIsFindRouter");
      //       this.$router.push({ name: "login" });
      //     }
      //   });
      // });
    }
  }
};
</script>
