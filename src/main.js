import Vue from "vue";
import "swiper/css/swiper.min.css";
import App from "@/App.vue";
import router from "./router";
import store from "./store";
import TypeNav from "./components/TypeNav"; // 导航
import Carousel from "./components/Carousel"; // 轮播图组件
import "./mock/mockServer";

Vue.config.productionTip = false; //去掉不是生产环境的提示

// 注册全局组件
Vue.component("TypeNav", TypeNav); //导航
Vue.component("Carousel", Carousel); //轮播图

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
