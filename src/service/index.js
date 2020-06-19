import axios from "axios";
import store from "@/store";
import "babel-polyfill";
import Cookie from "@u/cookie";
import router from "../router";
import { Loading } from "element-ui"; //引用element-ui的加载提示组件

let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "努力加载中……",
    background: "rgba(0, 0, 0, 0)"
  });
}

function endLoading() {
  loading.close();
}
// loading互不冲突调用
let needLoadingRequestCount = 0;

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

// 默认超时设置
/* eslint-disable */

// axios.defaults.timeout = 60000 * 10
axios.defaults.timeout = 60000 * 2
// 相对路径设置
axios.defaults.baseURL = ''
// loading图

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 设置参数格式
    if (!config.headers['Content-Type']) {
      config.headers = {
        'Content-Type': 'application/json'
      }
    }
    // 设置token 
    // // 非登录需要token
    // if( !config.url == process.env.VUE_APP_URL+'/adminsystem/login'){
    //   if(Cookie.get("token")){
    //     window.console.log(config)
    //     if(config.method == "post"){
    //       config.data.token = Cookie.get("token")
    //     }else if(config.method == "get"){
    //      window.console.log(1233)
    //     }
    //   }else{
    //     router.push({ name: "login" });
    //   }
    // }
    // 判断ie加时间戳防止不请求接口
    if (window.ActiveXObject || 'ActiveXObject' in window) {
      config.url = `${config.url}?time=${new Date().getTime()}`
    }
    showFullScreenLoading()
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// http response 拦截器
axios.interceptors.response.use(
  response => {
    // 访问接口后保存token信息
    window.console.log(response)
    if (response.headers.token) {
      //  Cookie.set("token", response.headers.token);
      store.dispatch("user/setToken", response.headers.token);
    }
    // 验证码 
    if (response.headers.verificatiocode) {
      Cookie.set("verificatiocode", response.headers.verificatiocode);
    }
    tryHideFullScreenLoading()
    return response
  },
  error => {
    tryHideFullScreenLoading()
    return Promise.reject(error)
  }
)







/**
 * 封装upload方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function upload(url, data = {}) {
  return new Promise((resolve, reject) => {
    if (Cookie.get("token")) {
      data.append("token", Cookie.get("token"));
    } else {
      Cookie.delete("token");
      store.dispatch("user/delToken");
      router.push({ name: "login" });
    }
    axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(response => {
        if (response.data.code == 30000 || response.data.code == 50000) {
          Cookie.delete("token");
          store.dispatch("user/delToken");
          router.push({ name: "login" });
        }
        if (response.data.code == 10000) {
          resolve(response.data.data)
        } else {
          this.$message({
            message: response.data.msg,
            type: 'warning'
          })
        }
      })
      .catch(err => {
        console.log(err)
        reject(err)
        this.$message({
          message: '请求失败！请检查网络',
          type: 'warning'
        })
      })
  })
}

/**
 * 封装export方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function exportExcel(url, data = {}, stringName = 'excel') {
  return new Promise((resolve, reject) => {
    if (Cookie.get("token")) {
      data.token = Cookie.get("token")
    } else {
      Cookie.delete("token");
      store.dispatch("user/delToken");
      router.push({ name: "login" });
    }
    axios.post(url, data, { responseType: 'blob' })
      .then(response => {
        if (response.data.code == 30000 || response.data.code == 50000) {
          Cookie.delete("token");
          store.dispatch("user/delToken");
          router.push({ name: "login" });
        }
        let fileName = response.headers["content-disposition"].split(";")[1].split("=")[1];  //filename名称截取
        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(response.data, fileName);
        }
        let url = window.URL.createObjectURL(response.data); //表示一个指定的file对象或Blob对象
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = stringName + '_' + fileName; //命名下载名称
        a.click(); //点击触发下载  
        window.URL.revokeObjectURL(url);  //下载完成进行释放
        document.body.removeChild(a)
      })
      .catch(err => {
        console.log(err)
        reject(err)
        if (window.navigator.msSaveBlob) {
          window.console.log('IE')
        } else {
          this.$message({
            message: '请求失败！请检查网络',
            type: 'warning'
          })
        }
      })
  })
}
/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    if (url != process.env.VUE_APP_URL + '/adminsystem/verificatioCode') {
      if (Cookie.get("token")) {
        params.token = Cookie.get("token")
      } else {
        Cookie.delete("token");
        store.dispatch("user/delToken");
        router.push({ name: "login" });
      }
    }
    return axios.get(url, {
      params: params
    })
      .then(response => {
        if (response.data.code == 30000 || response.data.code == 50000) {
          Cookie.delete("token");
          store.dispatch("user/delToken");
          router.push({ name: "login" });
        }
        if (response.data.code == 10000) {
          resolve(response.data.data)
        } else {
          this.$message({
            message: response.data.msg,
            type: 'warning'
          })
        }
      })
      .catch(err => {
        console.log(err)
        reject(err)
        this.$message({
          message: '请求失败！请检查网络',
          type: 'warning'
        })
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    if (url != process.env.VUE_APP_URL + '/adminsystem/login') {
      if (Cookie.get("token")) {
        data.token = Cookie.get("token")
      } else {
        Cookie.delete("token");
        store.dispatch("user/delToken");
        router.push({ name: "login" });
      }
    }
    axios.post(url, data)
      .then(response => {
        if (response.data.code == 30000 || response.data.code == 50000) {
          Cookie.delete("token");
          store.dispatch("user/delToken");
          router.push({ name: "login" });
        }
        if (response.data.code == 10000) {
          resolve(response.data.data)
        }
        //单独判断课程校验状态码
        else if (response.data.code == 30022) {
          resolve(response.data)
        }
        else {
          this.$message({
            message: response.data.msg,
            type: 'warning'
          })
        }
      })
      .catch(err => {
        console.log(err)
        reject(err)
        this.$message({
          message: '请求失败！请检查网络',
          type: 'warning'
        })
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        if (response.data.code == 30000 || response.data.code == 50000) {
          Cookie.delete("token");
          store.dispatch("user/delToken");
          router.push({ name: "login" });
        }
        if (response.data.code == 10000) {
          resolve(response.data.data)
        } else {
          this.$message({
            message: response.data.msg,
            type: 'warning'
          })
        }
      })
      .catch(err => {
        console.log(err)
        reject(err)
        this.$message({
          message: '请求失败！请检查网络',
          type: 'warning'
        })
      })
  })
}
/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, { data: data })
      .then(response => {
        if (response.data.code == 30000 || response.data.code == 50000) {
          Cookie.delete("token");
          store.dispatch("user/delToken");
          router.push({ name: "login" });
        }
        if (response.data.code == 10000) {
          resolve(response.data.data)
        } else {
          this.$message({
            message: response.data.msg,
            type: 'warning'
          })
        }
      })
      .catch(err => {
        console.log(err)
        reject(err)
        this.$message({
          message: '请求失败！请检查网络',
          type: 'warning'
        })
      })
  })
}

/* eslint-disable */
