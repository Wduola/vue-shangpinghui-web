<template>
  <!--banner轮播-->
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: {
    //声明接收属性
    carouselList: Array,
  },
  mounted() {
    if (this.carouselList.length > 0) {
      //判断已经有数据了
      this.initSwiper(); //直接创建sweiper对象
    }
  },
  watch: {
    //监视banners变化的回调函数
    carouselList(value) {
      // this.initSwiper();
      // 如果有数据才延迟创建swiper
      if (this.carouselList.length > 0) {
        this.$nextTick(() => {
          this.initSwiper();
        });
      }
    },
  },
  methods: {
    initSwiper() {
      // 创建swiper实例对象
      new Swiper(this.$refs.swiper, {
        // 循环模式选项
        loop: true,
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // 如果需要滚动条
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      });
    },
  },
};
</script>

<style></style>
