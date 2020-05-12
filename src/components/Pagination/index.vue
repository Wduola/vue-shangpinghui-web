<template>
  <div class="pagination">
    <button
      :disabled="myCurrentPage === 1"
      @click="setCurrentPage(myCurrentPage - 1)"
    >
      上一页
    </button>
    <button v-if="startEnd.start > 1" @click="setCurrentPage(1)">1</button>
    <button disabled v-if="startEnd.start > 2">•••</button>

    <!-- 连续页码 -->
    <button
      v-for="(item, index) in startEnd.end"
      :key="index"
      v-if="item >= startEnd.start"
      :class="{ active: item === myCurrentPage }"
      @click="setCurrentPage(item)"
    >
      {{ item }}
    </button>

    <button disabled v-if="startEnd.end < totalPages - 1">•••</button>
    <button v-if="startEnd.end < totalPages">{{ totalPages }}</button>
    <button
      :disabled="myCurrentPage === totalPages"
      @click="setCurrentPage(myCurrentPage + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px" :disabled="true">
      共 {{ total }} 条
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage: {
      //当前页码
      type: Number,
      default: 1,
    },
    pageSize: {
      //每页数量
      type: Number,
      default: 5,
    },
    total: {
      //总数量
      type: Number,
      default: 0,
    },
    showPageNo: {
      //连续数码数
      type: Number,
      default: 5, //最好为奇数
    },
  },
  data() {
    return {
      // 将外部传入的当前也i按作为档期那组件的当前页码初始值
      myCurrentPage: this.currentPage,
    };
  },
  computed: {
    // 总页数
    totalPages() {
      const { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },
    // 连续页码的开始和结束页码
    startEnd() {
      let start, end;
      const { myCurrentPage, showPageNo, totalPages } = this;
      // 计算start
      start = myCurrentPage - Math.floor(showPageNo / 2);
      if (start < 1) {
        start = 1;
      }
      // 计算end
      end = start + showPageNo - 1;
      if (end > totalPages) {
        end = totalPages;
        // 根据连续页码数修正start
        start = end - showPageNo + 1;
        if (start < 1) {
          start = 1;
        }
      }
      return { start, end };
    },
  },
  watch: {
    // 当父组件改变了其对应的数据时，此时回调函数就会自动调用
    currentPage(value) {
      this.myCurrentPage = value;
    },
  },
  methods: {
    // 设置当前页码
    setCurrentPage(currentPage) {
      // 一定要跟新 自己data中当前页码，而不是更新接收的current
      this.myCurrentPage = currentPage;
      // 分发vue自定义事件：通知父组件，代码变了
      this.$emit("currentChange", currentPage);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
