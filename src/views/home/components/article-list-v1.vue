<template>
  <div class="article-list">
      <van-list 
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText: "刷新成功" // 下拉刷新成功提示文本
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做 示列， 真实场景中一般为 ajax请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>

<style>
</style>