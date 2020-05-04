// 路由器对象模块
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

// 声明式使用vue插件
Vue.use(VueRouter);

export default new VueRouter({
  mode: "history", //不带#的模式
  routes, //配置多有路由
});
