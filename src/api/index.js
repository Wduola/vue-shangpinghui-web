// 所有接口请求函数模块
// 每个函数的返回值都是promise
import ajax from "./ajax";

// --------------------------获取三级分类列表 GET
export function reqBaseCategoryList() {
  return ajax({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
}
// -------------------------请求登录页面  POST
export function reLogin() {
  return ajax({
    method: "POST",
    url: "/user/passport/login",
    data: { mobile, password },
  });
}
