<template>
  <div>
    <Header />
    <router-view></router-view>
    <!-- 方法一:直接在Footer标签中中判断
    <Footer v-show="$route.path !== '/register' && $route.path !== '/login'" /> -->
    <!-- 方法二:在route的属性mata上设置isHideFooter,在判断mate上isHideFooter的真假 -->
    <Footer v-show="!$route.meta.isHideFooter" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { reqFloors } from "@/api";

export default {
  name: "App",
  async mounted() {
    // 测试针对mock接口的vuex代码
    this.$store.dispatch("getFloors");
    this.$store.dispatch("getBanners");
    // console.log(this.$store.state);
    // 通过异步action获取异步获取数据到vuex的state中
    this.$store.dispatch("getBaseCategoryList");
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped></style>
