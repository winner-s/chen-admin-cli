<template>
  <div class="header">
    <div class="header_l">
      <div class="header_logo"></div>
    </div>
    <div class="header_r">
      <div class="headr_d1">
        <side-collapse class="sidecoll"></side-collapse>
        <bread-crumb class="bread"></bread-crumb>
      </div>
      <div class="headr_d2">
        <ul class="headrUl clearFixed">
          <li id="reload">
            <el-badge @click.native="reload">
              <i class="el-icon-refresh iconFont" title="刷新"></i>
            </el-badge>
          </li>
          <!-- <li id="domMessage">
            <el-badge is-dot @click.native="toggleMsgShow">
              <i class="el-icon-message-solid iconFont"></i>
            </el-badge>
          </li> -->
          <li id="domFullScreen" title="全屏">
            <full-screen></full-screen>
          </li>
          <li id="domPersonal">
            <user-dropdown></user-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SideCollapse from "@/components/SideCollapse";
import BreadCrumb from "@/components/BreadCrumb";
import UserDropdown from "@/components/UserDropdown";
import FullScreen from "@/components/FullScreen";
export default {
  components: {
    SideCollapse,
    BreadCrumb,
    UserDropdown,
    FullScreen
  },
  methods: {
    toggleMsgShow() {
      this.$store.commit("app/SET_MSGISOPEN");
    },
    reload() {
      this.$router.go(0);
    }
  }
};
</script>
<style scoped lang="scss">
.logo-size {
  font-size: 32px;
}
.header_logo {
  background: #5b6270;
  width: 80%;
  height: 40px;
  margin: 10px auto 0;
  border-radius: 5px;
}
</style>
