// 使用mockjs来mock接口
import Mock from "mock";
import banner from "./banner";
import floor from "./floor";

// 模拟一个返回轮播图数据接口
Mock.mock("/mock/banner", { code: 200, data: banner });
// 模拟一个返回所有楼层数据接口
Mock.mock("/mock/floors", { code: 200, data: floor });
// 当前模块不需要向外暴露，需加载运行以西
console.log("mockServer...");
