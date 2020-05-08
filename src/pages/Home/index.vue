<template>
  <div class="home">
    <!-- 商品分类导航 -->
    <TypeNav />
    <!-- 轮播图 -->
    <ListContainer />
    <!-- 今日推荐 -->
    <TodyRecommend />
    <!-- 热门排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!-- 图片墙 -->
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
    <!-- 商标 -->
    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListContainer from "./ListContainer/ListContainer";
import TodyRecommend from "./TodyRecomend/TodyRecomend";
import Brand from "./Brand/Brand";
import Like from "./Like/Like";
import Floor from "./FLoor/FLoor";
import Rank from "./Rank/Rank";

export default {
  name: "Home",
  mounted() {
    // 分发action请求获取banners和floors数据到state中
    this.$store.dispatch("getBanners");
    this.$store.dispatch("getFloors");
  },
  computed: {
    ...mapState({
      floors: (state) => state.home.floors,
    }),
  },
  // 局部注册
  components: {
    ListContainer,
    TodyRecommend,
    Brand,
    Like,
    Floor,
    Rank,
  },
};
</script>

<style lang="less" scoped></style>
