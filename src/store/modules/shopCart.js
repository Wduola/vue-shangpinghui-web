// 管理购物车相关数据

import {
  reqCartList,
  reqCheckCartItem,
  reqAddToCart,
  reqDeleteCartItem,
} from "@/api";
export default {
  state: {
    cartList: [], //购物车泪列表
  },
  mutations: {
    RECEIVE_CART_LIST(state, { cartList }) {
      state.cartList = cartList;
    },
  },
  actions: {
    // 获取购物车列表数据的异步active
    async getCartList({ commit }) {
      const result = await reqCartList();
      if (result.code === 200) {
        const cartList = result.data;
        commit("RECEIVE_CART_LIST", { cartList }); // 提交给mutation是包含数据的对象
      }
    },
    // 改变购物项的勾选状态的异步
    async checkCartItem({ commit }, { skuId, isChecked }) {
      const result = await reqCheckCartItem(skuId, isChecked);
      if (result.code !== 200) {
        throw new Error(result.message || "修改勾选状态的操作成功");
      }
    },
    // 对所有购物项实现全选或全不选
    async checkAllCartItems({ state, commit, dispatch, getters }, checked) {
      const isChecked = checked ? 1 : 0;
      const promises = [];
      // 遍历所有购物项
      state.cartList.forEach((item) => {
        // 判断所有的勾选状态和要更新的状态一样，不需要发送请求处理
        if (item.isChecked === isChecked) return;
        const promise = dispatch("checkCartItem", {
          skuId: item.skuId,
          isChecked,
        });
        promises.push(promise);
      });
      return Promise.all(promises);
    },
    // 添加商品到购物车
    // --------------------方法一
    async addToCart({ commit }, { skuId, skuNum, callback }) {
      const result = await reqAddToCart(skuId, skuNum);
      if (result.code === 200) {
        console.log("添加购物车成功");
        callback(); // 成功了不传递错误信息
      } else {
        console.log("添加购物车失败");
        callback("添加到购物车失败");
      }
    },
    // --------------------方法二：
    async addToCart2({ commit }, { skuId, skuNum }) {
      const result = await reqAddToCart(skuId, skuNum);
      if (result.code === 200) {
        // 添加到购物车成功
        return ""; // async函数的promise是成功的, value是''
      } else {
        // 失败
        return "添加到购物车失败"; // async函数的promise是成功的, value为errorMsg
      }
    },
    // --------------------方法三
    // 添加到购物车异步
    async addToCart3({ commit }, { skuId, skuNum }) {
      const result = await reqAddToCart(skuId, skuNum);
      if (result.code === 200) {
        // 添加到购物车成功
        return ""; // async函数的promise是成功的
      } else {
        // 失败
        throw new Error("添加到购物车失败"); // async函数的promise就是失败的
      }
    },
    // 删除一个购物项的异步action
    async deleteCartItem(context, skuId) {
      const result = await reqDeleteCartItem(skuId);
      if (result.code !== 200) {
        // 失败
        throw new Error("删除购物项失败"); // async函数的promise就是失败的
      }
    },
    // 删除所有勾选的购物项的异步action
    async deleteCheckedCartItems({ state, dispatch }) {
      // 遍历每个勾选的购物项去分发deleteCartItem
      const promises = state.cartList.reduce((pre, item) => {
        if (item.isChecked === 1) {
          pre.push(dispatch("deleteCartItem", item.skuId));
        }
        return pre;
      }, []);

      return Promise.all(promises);
    },
  },
  getters: {
    // 已选中的商品的总数量
    totalCount(state) {
      let total = 0;
      state.cartList.forEach((item) => {
        const { isChecked, skuNum } = item;
        // 只有在当前购物选项选中才累加
        if (isChecked === 1) {
          total += skuNum;
        }
      });
      return total;
      /*// 使用数组的reduce()方法
      return state.cartList.reduce((pre, item) => {
        return item.isChecked === 1 ? pre + item.skuNum*item*cartPrice : pre;
      }, 0);
      */
    },
    // 已选中的商品的总价格
    totalPrice(state) {
      let total = 0;
      state.cartList.forEach((item) => {
        const { isChecked, cartPrice, skuNum } = item;
        // 只有当前购物选中的才累加
        if (isChecked === 1) {
          total += cartPrice * skuNum;
        }
      });
      return total;
    },
  },
};
