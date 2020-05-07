<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideCategorys" @mouseenter="showCategorys">
        <h2 class="all">全部商品分类</h2>
        <transition name="move">
          <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ item_on: index === currentIndex }"
                @mouseenter="showSubCategorys(index)"
              >
                <h3>
                  <a
                    href="javascript:"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          href="javascript:"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
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
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -2, //在最外层div中
      isShowFirst: false, //是否显示一级列表
    };
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.baseCategoryList,
    }),
  },
  // 初始显示之前调用，执行同步操作更新数据
  beforeMount() {
    // 判断档当前请求路径是否是/，是显示一级列表，否隐藏
    this.isShowFirst = this.$route.path === "/";
  },
  /*mounted() {
    // 通过一部active获取一部数据到vuex的state中
    this.$store.dispatch("getBaseCategoryList");
  },*/
  methods: {
    // 显示分类列表
    showCategorys() {
      this.currentIndex = -1;
      this.isShowFirst = true;
    },
    // 隐藏分类列表
    hideCategorys() {
      this.currentIndex = -2;
      // 如果当前不是首页，隐藏一级列表
      if (this.$route.path !== "/") {
        this.isShowFirst = false;
      }
    },
    // 显示指定下标的子分类
    showSubCategorys: throttle(function(index) {
      if (this.currentIndex === -2) return; //完全移除不用更新
      this.currentIndex = index; //更新需要显示的子分类下标
    }, 300),
    // 点击分类项，跳转到所搜页面
    toSearch(event) {
      const {
        categoryname,
        category1id,
        category2id,
        category3id,
      } = event.target.dataset;
      // 判断点击分类项
      if (categoryname) {
        //所有分类想指定了data-categoryName
        // 准备query参数对象
        const query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // 用于路由跳转location对象
        const location = {
          name: "search",
          query,
        };
        // 得到当前的params参数对象
        const { keyword } = this.$route.params;
        // 根据分类搜索时，也携带搜索关键字params参数
        if (keyword) {
          location.params = { keyword };
        }
        // 跳转到search
        this.$router.push(location);
        // 隐藏一级列表
        this.hideCategorys();
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
                color: orangered;
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
                  }
                }
              }
            }
          }

          &.item_on {
            background: #e7e7e7;
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
