// 对axios二次封装
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress";

// 配置不显示右上角的旋转进度条，显示水平进度条
NProgress.configure({ showSpinner: false });

// ------------------1. 配置通用的基础路径和超时
const instance = axios.create({
  baseURL: "/api",
  timeout: 15000,
});
// axios请求拦截器
instance.interceptors.request.use((config) => {
  console.log("请求拦截器执行");
  // --------------------2. 发送请求时，显示进度条
  NProgress.start(); //显示进度条
  return config;
});
// axios响应拦截器
instance.interceptors.response.use(
  (response) => {
    console.log("响应连接器成功回调执行");
    NProgress.done(); //进度条隐藏

    // ------------------3. 成功返回的数据不再是response, 而直接是响应体数据response.data
    return response.data; //返回响应数据
  },
  (error) => {
    console.log("响应拦截器失败回调执行");
    NProgress.done(); //进度条隐藏
    alert(`请求出错：${error.message || "未知错误"}`);

    // ------------------4. 统一处理请求错误, 具体请求也可以选择处理或不处理
    return Promise.reject(error); //返回失败原因
  }
);
// 向外暴露分装好的instance
export default instance;
