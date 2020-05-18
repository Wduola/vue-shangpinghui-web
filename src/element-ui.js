//element-ui相关设置

import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
// 按需引入
import { Pagination, MessageBox, Message, Button } from "element-ui";

// 注册全局组件
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button);

//
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
