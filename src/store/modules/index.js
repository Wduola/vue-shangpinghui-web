/* 
包含vuex所有的子模块
 */

import home from "./home";
import user from "./user";
import search from "./search"; // 取默认暴露的模块, 如果没有就是undefined
import detail from "./detail"; //商品详情页
import shopCart from "./shopCart"; //购物车模块
import order from "./order"; //订单模块

// console.log('search', search)

export default {
  home,
  user,
  search,
  detail,
  shopCart,
  order,
};

/* 
vuex的store管理的总state是什么结构:
  {
    home: {
      baseCategoryList: [],
      x: {},
      y: ''
    },

    user: {
      userInfo: {},
      x: ''
    },

    search: {
      
    }
  }
*/
