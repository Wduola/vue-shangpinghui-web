import Vue from "vue";
import App from "@/App.vue";
import router from "./router";
import TypeNav from "./components/TypeNav";
// 注册全局组件
Vue.component("TypeNav", TypeNav);

Vue.config.productionTip = false; //去掉不是生产环境的提示

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
