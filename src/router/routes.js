// 所有路由配置的数组
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";

import Register from "@/pages/Register";
import Login from "@/pages/Login";

export default [
  {
    //home页面
    path: "/",
    component: Home,
  },
  {
    //搜索页面
    name: "search", // 是当前路由的标识名称
    path: "/search/:keyword?",
    component: Search,
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
  },
  {
    //商品购物车
    nama: "shopcart",
    path: "/shopcart",
    component: ShopCart,
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
  },
];
