// 入口js
import Vue from "vue";
import "swiper/css/swiper.min.css"; // 如果需要查找包下的非主模块, 需要指定后面的路径

import App from "@/App";
import router from "./router";
import store from "./store";
import TypeNav from "@/components/TypeNav"; //导航
import Carousel from "@/components/Carousel"; //轮播图
import Pagination from "@/components/Pagination"; //分頁顯示
import "./mock/mockServer";
import "./validate"; //vee-validate
import * as API from "@/api"; // 引入所有接口请求函数并包装在API对象中

Vue.config.productionTip = false; // 去掉不是生产环境的提示

Vue.prototype.$API = API; //讓所有組件對象可以直接看到API對象

// 注册全局组件
Vue.component("TypeNav", TypeNav);
Vue.component("Carousel", Carousel);
Vue.component("Pagination", Pagination);

new Vue({
  beforeCreate() {
    // 给Vue原型对象指定事件总线对象(当前vm对象)
    Vue.prototype.$bus = this;
  },
  // el: '#app'
  render: (h) => h(App), // 将App组件的对象界面渲染到页面上
  router, // 配置路由器  所有组件对象都可以通过$router属性得到router对象
  store, // 配置vuex的store  所有组件对象都可以通过$store属性得到store对象
}).$mount("#app");
