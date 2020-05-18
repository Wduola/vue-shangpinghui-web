// 所有路由配置的数组

// 路由的按需加载
// import Home from "@/pages/Home";
// import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";

import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/MyOrder";
import GroupBuy from "@/pages/Center/GroupBuy";

import Register from "@/pages/Register";
import Login from "@/pages/Login";
import store from "@/store";
import router from "@/router";

export default [
  /* 
component: () => import('@/pages/Search')
1. import(modulePath): 动态import引入模块, 被引入的模块会被单独打包
2. 组件配置的是一个函数, 函数中通过import动态加载模块并返回, 
    初始时函数不会执行, 第一次访问对应的路由才会执行, 也就是说只有一次请求对应的路由路径才会请求加载单独打包的js
作用: 用于提高首屏的加载速度
*/
  {
    //home页面
    path: "/",
    // component:"Home",
    component: () => import("@/pages/Home"), // 路由的按需加载
  },
  {
    //搜索页面
    name: "search", // 是当前路由的标识名称
    path: "/search/:keyword?",
    // component: Search,
    component: () => import("@/pages/Search"), // 路由的按需加载
    // 将params参数和query参数映射成属性传入路由组件
    props: (route) => ({
      keyword3: route.params.keyword,
      keyword4: route.query.keyword2,
    }),
  },
  {
    //商品详情页
    name: "detail", // 是当前路由的标识名称
    path: "/detail/:skuId",
    component: Detail,
  },
  {
    //添加商品成功页面
    name: "addcartsuccess",
    path: "/addcartsuccess",
    component: AddCartSuccess,
    // 路由守卫
    beforeEnter(to, from, next) {
      // 得到当前路由信息对象
      const route = router.currentRoute; //from
      // 要跳转到目标路由的query参数
      const skuNum = to.query.skuNum;
      // 读取保存数据
      const skuInfo = JSON.parse(window.sessionStorage.getItem("SKU_INFO_KEY"));
      // console.log("2222", skuNum, skuInfo);
      // 都存在放行
      if (skuNum && skuInfo) {
        next();
      } else {
        // 在组件对象创建前强制跳转到首页
        next("/");
      }
    },
  },
  {
    //商品购物车
    nama: "shopcart",
    path: "/shopcart",
    component: ShopCart,
  },
  {
    //订单页
    path: "/trade",
    component: Trade,
    // 路由守卫
    // 只能从购物车界面, 才能跳转到交易界面
    beforeEnter(to, from, next) {
      if (from.path === "/shopcart") {
        next();
      } else {
        next("/shopcart");
      }
    },
  },
  {
    //支付页
    path: "/pay",
    component: Pay,
    // 将query参数映射成props传递给路由组件
    props: (route) => ({ orderId: route.query.orderId }),
    // 路由守卫
    // 只能从交易界面, 才能跳转到支付界面
    beforeEnter(to, from, next) {
      if (from.path === "/trade") {
        next();
      } else {
        next("/trade");
      }
    },
  },
  {
    //支付成功页
    path: "/paysuccess",
    component: PaySuccess,
    // 只有从支付界面, 才能跳转到支付成功的界面
    beforeEnter(to, from, next) {
      if (from.path === "/pay") {
        next();
      } else {
        next("/pay");
      }
    },
  },
  {
    //用户中心
    path: "/center",
    component: Center,
    children: [
      {
        //我的订单
        path: "myorder",
        component: MyOrder,
      },
      {
        //团购订单
        path: "groupbuy",
        component: GroupBuy,
      },
      {
        //重定向
        path: "",
        redirect: "myorder",
      },
    ],
  },

  {
    //注册页
    path: "/register",
    component: Register,
    meta: {
      isHideFooter: true,
    },
  },
  {
    //登录页
    path: "/login",
    component: Login,
    meta: {
      isHideFooter: true,
    },
    beforeEnter: (to, from, next) => {
      //路由前置守卫
      // 没有登陆放行
      if (!store.state.user.userInfo.token) {
        next();
      } else {
        // 登陆，跳转到首页
        next("/");
      }
    },
  },
];
