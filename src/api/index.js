/* 
包含所有接口请求函数的模块
每个函数的返回值都是promise
*/

import ajax from "./ajax";
import mockAjax from "./mockAjax";

/* 
请求获取3级分类列表
/api/product/getBaseCategoryList
*/
export function reqBaseCategoryList() {
  // return ajax('/product/getBaseCategoryList')
  return ajax({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
  // return ajax.get('/product/getBaseCategoryList')
}

/* 
请求登陆
/api/user/passport/login
POST
*/
export function reqLogin(mobile, password) {
  return ajax({
    method: "POST",
    url: "/user/passport/login",
    data: { mobile, password },
  });

  // return ajax.post('/user/passport/login', {mobile, password})
}

/* mock接口对应的接口请求函数 */
export const reqBanners = () => mockAjax("/banners");
export const reqFloors = () => mockAjax("/floors");

/* 
根据搜索的条件参数对象获取商品列表数据
*/
export const reqProductList = (searchParams) =>
  ajax({
    url: "/list",
    method: "POST",
    data: searchParams,
  });
// 请求获取指定id的商品信息
// /api/item/{skud}
export const reqProduct = (skuId) => ajax(`/item/${skuId}`);
// reqProduct(6);//测试查看数据
