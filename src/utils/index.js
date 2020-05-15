// 包含一些工具函数的模块
// 得到当前用户的临时id
import { v4 as uuidv4 } from "uuid";

// 得到用户的临时id
export function getUserTempId() {
  // 从localStorage读取保存用户的临时id
  let userTempId = localStorage.getItem("USER_TEMP_ID_KEY");
  // 如果没有，通过UUID生成一个新的，保存到localStorage，并返回
  if (!userTempId) {
    userTempId = uuidv4();
    localStorage.setItem("USER_TEMP_ID_KEY", userTempId);
  }
  // 返回
  return userTempId;
}

// 保存用户信息
export function saveUserInfo(userInfo) {
  localStorage.setItem("USER_INFO_KEY", JSON.stringify(userInfo));
}

// 读取local中保存的用户信息
export function getUserInfo() {
  return JSON.parse(localStorage.getItem("USER_INFO_KEY")) || {};
}

// 清除保存的用戶信息
export function removeUserInfo() {
  localStorage.removeItem("USER_INFO_KEY");
}
