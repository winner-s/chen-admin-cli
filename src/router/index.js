import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Layout from "@/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@v/login"),
    meta: { title: "登录" },
    hidden: true
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@v/error-page/404.vue"),
    hidden: true
  },
  
  {
    path: "/",
    name: "home",
    value:"首页",
    component: Layout,
    redirect: "/dashbord",
    children: [
      {
        path: "dashbord",
        name: "dashbord",
        component: () => import("@v/dashboard/index.vue"),
        meta: { title: "首页", icon: "el-icon-s-home" }
      }
    ]
  }
];


/*动态添加routers*/
export const asyncRoutes = [
  {
    path: "/productManage",
    name: "productManageParent",
    component: Layout,
    value:"产品管理",
    redirect: "/productManage",
    
    children: [
      {
        path: "productManage",
        name: "productManage",
        value: "产品管理",
        component: () => import("@v/productManager/productManager/index.vue"),
        meta: { title: "产品管理" , icon: "el-icon-s-custom"}
      }
    ]
  },
  {
    path: "/orderManage",
    name: "orderManageParent",
    value: "订单管理",
    component: Layout,
    redirect: "/orderManage",
    children: [
      {
        path: "orderManage",
        name: "orderManage",
        value: "订单管理",
        component: () => import("@v/orderManage"),
        meta: { title: "订单管理" }
      }
    ]
  },
  {
    path: "/reportManage",
    name: "reportManageParent",
    value: "报告管理",
    component: Layout,
    redirect: "/reportManage",
    children: [
      {
        path: "reportManage",
        name: "reportManage",
        value: "报告管理",
        component: () => import("@v/reportManage"),
        meta: { title: "报告管理" }
      }
    ]
  },
  {
    path: "/notification",
    name: "notificationParent",
    value: "消息通知",
    component: Layout,
    redirect: "/notification",
    children: [
      {
        path: "notification",
        name: "notification",
        value: "消息通知",
        component: () => import("@v/reportManage"),
        meta: { title: "消息通知" }
      }
    ]
  },
  {
    path: "/userManager",
    name: "userManagerParent",
    value: "用户管理",
    component: Layout,
    redirect: "/userManager",
    children: [
      {
        path: "userManager",
        name: "userManager",
        value: "用户管理",
        component: () => import("@v/userManager"),
        meta: { title: "用户管理" }
      }
    ]
  },
  {
    path: "/advertManager",
    name: "advertManagerParent",
    value: "广告管理",
    component: Layout,
    redirect: "/advertManager",
    children: [
      {
        path: "advertManager",
        name: "advertManager",
        value: "广告管理",
        component: () => import("@v/advertManager"),
        meta: { title: "广告管理" }
      }
    ]
  },
  {
    path: "/accountManager",
    name: "accountManagerParent",
    value: "管理账号管理",
    component: Layout,
    redirect: "/accountManager",
    children: [
      {
        path: "accountManager",
        name: "accountManager",
        value: "管理账号管理",
        component: () => import("@v/accountManager"),
        meta: { title: "管理账号管理" }
      }
    ]
  }
]


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


// 导航守卫
router.beforeEach(async (to, from, next) => {
  store.commit('SET_ROUTES',asyncRoutes)
  if(to.path== "/login"){
    next()
  }else{
    next();
  }
});

export default router;
