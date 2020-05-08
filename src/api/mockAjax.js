import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });
const instance = axios.create({
  baseURL: "/mock",
  timeout: 15000,
});
// axios请求拦截器
instance.interceptors.request.use((config) => {
  console.log("mockAjax中请求拦截器");
  NProgress.start();
  return config;
});
// axios响应拦截器
instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data;
  },
  (error) => {
    NProgress.done();
    alert(`请求出错: ${error.message || "未知错误"}`);
    return Promise.reject(error);
  }
);
export default instance;
