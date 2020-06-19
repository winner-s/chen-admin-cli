import Vue from "vue";
import { post, get, del, put, upload, exportExcel } from "./index";
const _baseUrl = process.env.VUE_APP_URL;
/* eslint-disable */
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$del = del
Vue.prototype.$put = put
Vue.prototype.$upload = upload
Vue.prototype.$exportExcel = exportExcel



//账号登录
const loginAdminURl = `${_baseUrl}/gene/web/admin/loginAdmin`
export const loginAdmin = function (json) {
  return Vue.prototype.$post(loginAdminURl, json)
}

//添加用户
const addAdminURL = `${_baseUrl}/gene/web/admin/addAdmin`
export const addAdmin = function (json) {
  return Vue.prototype.$post(addAdminURL, json)
}


//用户注销
const logoutAdminURL = `${_baseUrl}/gene/web/admin/logoutAdmin`
export const logoutAdmin = function (json) {
  return Vue.prototype.$post(logoutAdminURL, json)
}

//获取sessionId及服务端公钥
const getSessionIdURL = `${_baseUrl}/gene/web/admin/getSessionId`
export const getSessionId = function (json) {
  return Vue.prototype.$post(getSessionIdURL, json)
}

//更新账号信息
const updateAdminURL = `${_baseUrl}/gene/web/admin/updateAdmin`
export const updateAdmin = function (json) {
  return Vue.prototype.$post(updateAdminURL, json)
}

//修改账号状态(停用/启用)
const updateAdminStatusURL = `${_baseUrl}/gene/web/admin/updateAdminStatus`
export const updateAdminStatus = function (json) {
  return Vue.prototype.$post(updateAdminStatusURL, json)
}

//分页显示账号
const selectPageURL = `${_baseUrl}/gene/web/admin/selectPage`
export const selectPage = function (json) {
  return Vue.prototype.$post(selectPageURL, json)
}

//添加角色
const addRoleURL = `${_baseUrl}/gene/web/role/addRole`
export const addRole = function (json) {
  return Vue.prototype.$post(addRoleURL, json)
}

//更新角色
const updateRoleURL = `${_baseUrl}/gene/web/role/updateRole`
export const updateRole = function (json) {
  return Vue.prototype.$post(updateRoleURL, json)
}

//分页显示角色
const selectRolePageURL = `${_baseUrl}/gene/web/role/selectRolePage`
export const selectRolePage = function (json) {
  return Vue.prototype.$post(selectRolePageURL, json)
}

//查看角色权限
const selectRolePermissionURL = `${_baseUrl}/gene/web/role/selectRolePermission`
export const selectRolePermission = function (json) {
  return Vue.prototype.$post(selectRolePermissionURL, json)
}

//修改角色权限
const saveRolePermissionURL = `${_baseUrl}/gene/web/role/saveRolePermission`
export const saveRolePermission = function (json) {
  return Vue.prototype.$post(saveRolePermissionURL, json)
}

