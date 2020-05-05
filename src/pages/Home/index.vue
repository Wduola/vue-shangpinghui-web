<template>
  <div>
    <!-- 导航 -->
    <TypeNav />
    <!-- 轮播图 -->
    <ListContainer />
    <!-- 今日推荐 -->
    <TodyRecommend />
    <!-- 热门排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!-- 楼层 -->
    <Floor />
    <!-- 楼层 -->
    <Floor />
    <!-- 商标 -->
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer/ListContainer";
import TodyRecommend from "./TodyRecommend/TodyRecommend";
import Rank from "./Rank/Rank";
import Like from "./Like/Like";
import Floor from "./Floor/Floor";
import Brand from "./Brand/Brand";
export default {
  name: "Home",
  components: {
    ListContainer,
    TodyRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
};
</script>

<style lang="less" scoped></style>
