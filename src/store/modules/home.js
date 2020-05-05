// 管理首页数据的vuex模块

import { reqBaseCategoryList } from "@/api";
export default {
  state: {
    baseCategoryList: [],
  },
  mutations: {
    // 保存新的分类列表
    RECEIVE_BASE_CATEGORY_LIST(state, baseCategoryList) {
      state.baseCategoryList = baseCategoryList;
    },
  },
  actions: {
    // 获取分类列表的异步actions
    async getBaseCategoryList({ commit }) {
      // 发异步请求
      const result = await reqBaseCategoryList();
      // 成功后，提交mutation保存的数据
      if (result.code === 200) {
        const baseCategoryList = result.data;
        commit("RECEIVE_BASE_CATEGORY_LIST", baseCategoryList);
      }
    },
  },
  getters: {},
};
