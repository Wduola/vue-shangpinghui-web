<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="currentIndex = -2" @mouseenter="currentIndex = -1">
        <h2 class="all">全部商品分类</h2>
        <div class="sort">
          <div class="all-sort-list2" @click="toSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ item_on: index === currentIndex }"
              @mouseenter="showSubCategorys(index)"
            >
              <h3>
                <!-- 方法一：编程式：点击三级菜单跳转搜索页 优点：不用渲染子类，显示快 事件监听多，需要事件委派-->
                <!-- <a href="javasript:;" @click="`/search?categoryName=${c1.categoryName}&category1Id={c1.categoryId}`">{{ c1.categoryName }}</a> -->
                <a
                  href="javasript:;"
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
                <!-- 方程二：声明式：点击三级菜单跳转搜索页 缺点：子类多了渲染多，显示缓慢-->
                <!-- <router-link :to="`/search?categoryName=${c1.categoryName}&category1Id={c1.categoryId}`">{{ c1.categoryName }}</router-link> -->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <!-- <a href="javascript:;" @click="`/search?categoryName=${c2.categoryName}&category2Id={c2.categoryId}`">{{ c2.categoryName }}</a> -->
                      <a
                        href="javascript:;"
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                      <!-- <router-link :to="`/search?categoryName=${c2.categoryName}&category2Id={c2.categoryId}`">{{ c2.categoryName }}</router-link> -->
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <!-- <a href="javascript:;" @click="`/search?categoryName=${c3.categoryName}&category3Id={c3.categoryId}`">{{ c3.categoryName }}</a> -->
                        <a
                          href="javascript:;"
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                        <!-- <router-link :to="`/search?categoryName=${c3.categoryName}&category3Id={c3.categoryId}`">{{ c3.categoryName }}</router-link> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle"; //按需引入，减少体积
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1, //-2离开范围，-1在范围中
    };
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.baseCategoryList,
    }),
  },
  mounted() {
    this.$store.dispatch("getBaseCategoryList");
  },
  methods: {
    // 显示指定下标的子分类
    // showSubCategorys(index) {
    //   this.currentIndex = index;
    // },
    showSubCategorys: throttle(function(index) {
      console.log("函数节流····", index);
      if (this.currentIndex === -2) return; //如果已经移除，不在更新
      this.currentIndex = index;
    }, 200),
    // 点击分类，跳转到搜索页
    toSearch(event) {
      // const element = event.target; //事件委派的目标事件
      // if (element.tagName.toUpperCase() === "A") {
      //   this.$router.push("/search/"); //需要指定自定义属性
      // }

      const {
        categoryname,
        category1id,
        category2id,
        category3id,
      } = event.target.dataset;
      // 判断分类项
      if (categoryname) {
        const query = { categoryName: categoryname }; //准备query参数
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 跳转search
        this.$router.push({
          name: "search",
          query,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
        &:hover {
          color: orangered !important;
          text-decoration: none;
        }
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      // overflow: hidden;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
              &:hover {
                // color: #fff;
                text-decoration: none;
              }
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 710px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 650px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                    a {
                      text-decoration: none;
                      &:hover {
                        color: orangered;
                      }
                    }
                  }
                }
              }
            }
          }

          &.item_on {
            background: #e1251b;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
