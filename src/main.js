import Vue from "vue";
import App from "@/App.vue";
import router from "./router";
import store from "./store";
import TypeNav from "./components/TypeNav"; // 导航
import "./mock/mockServer";

Vue.config.productionTip = false; //去掉不是生产环境的提示

// 注册全局组件
Vue.component("TypeNav", TypeNav);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
