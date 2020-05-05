// vuex最核心的管理对象
import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

// 声明使用vuex的插件
Vue.use(Vuex);

const mutations = {};
const actions = {};
const getters = {};
// 向外暴露store对象
export default new Vuex.Store({
  // state,
  mutations,
  actions,
  getters,
  modules,
});
