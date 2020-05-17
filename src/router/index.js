// 路由器对象模块
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";

// 声明使用vue插件
Vue.use(VueRouter);

// 解决2: 修正Vue原型上的push和replace方法 (优秀)
// 缓存原型上的push方法
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
// 重新指定原型上的push方法
VueRouter.prototype.push = function(location, onComplete, onAbort) {
  // console.log("push()", location, onComplete, onAbort);
  // this是路由器对象 $router
  // 如果调用push, 传递了成功或者失败的回调函数
  if (onComplete || onAbort) {
    // 让原来的push方法进行处理
    originPush.call(this, location, onComplete, onAbort); // 不用返回, 因为执行的结果返回是undfined
  } else {
    // 如果调用push, 没传递了成功或者失败的回调函数, 可能会抛出失败的promise, 需要catch一下
    return originPush.call(this, location).catch((e) => {
      console.log("catch error2");
      return new Promise(() => {});
    });
  }
};

const router = new VueRouter({
  mode: "history", // 不带#的模式
  routes, // 配置所有路由
  // 滚动行为配置
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }; //跳转路由时，滚动条自动在00位置
  },
});

/*// 注册全局前置守卫
router.beforeEach((to, from, next) => {
  //即将跳转到目标前回调
  console.log("beforeEach()", to, from);
  next(); //放行
});
// 注册全局后置守卫
router.afterEach((to, from) => {
  //已经跳转到目标路由才调用
});
*/
// 所有需要进行登陆检查的路由路径的数组
const checkPaths = ["/trade", "/pay", "/center"]; //所有以他开头的路径都要检查
// 只有登录了才可以查看交易/支付/个人中心页面
router.beforeEach((to, from, next) => {
  // 即将跳转到目标前回调
  const targetPath = to.path;
  // 如果目标路由是需要登陆检查的
  const isCheckPath = checkPaths.some((path) => targetPath.indexOf(path) === 0);
  if (isCheckPath) {
    // 判断已经登陆放行
    if (store.state.user.userInfo.name) {
      next();
    } else {
      // 如果没有登陆, 强制自动跳转到登陆页面
      next("/login?redirect=" + targetPath);
    }
  } else {
    next();
  }
});
export default router;
