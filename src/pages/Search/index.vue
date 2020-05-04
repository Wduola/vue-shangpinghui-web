<template>
  <div>
    <h2>Search</h2>
    <h3>params参数：keyword={{ $route.params.keyword }}</h3>
    <h3>query参数：keyword2={{ $route.query.keyword2 }}</h3>
    <h3>params参数：props:keyword3={{ keyword3 }}</h3>
    <h3>query参数：props:keyword4={{ keyword4 }}</h3>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: ["keyword3", "keyword4"],
};
</script>

<style lang="less" scoped></style>
