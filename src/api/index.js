// 包含所有接口请求函数的模块
// 每个函数的返回值都是Promise
import ajax from "./ajax";

// 请求获取三级分类列表  /api/product/getBaseCategoryList   GET
// 分别暴漏
export function reqBaseCategoryList() {
  return ajax({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
}

// 请求登陆  /api/user/passport/login   POST
export function reqLogin(mobile, password) {
  return ajax({
    method: "POST",
    url: "/user/passport/login",
    data: { mobile, password },
  });
}
