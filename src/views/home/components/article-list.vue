<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";

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
    // 当触发上拉加载更多的时候调用该函数
    async onLoad() {
      console.log("onLoad");
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          // 频道ID
          channel_id: this.channel.id,
          // 时间戳timestamp 简单来理解就是请求数据的页码
          // 例如： 请求第1页数据 -> 当前最新时间戳
          // 那用于请求当前页之后的数据怎么实现呢？
          // 用于请求之后数据的 时间戳 会在当前请求结果中返回给你
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        });
        console.log("getArticles--->");

        // 摸拟异常情况 随机 50%  仅用于测试
        // if(Math.random() > 0.5){
        //   JSON.parse('diasnngfang')
        // }

        // 2.把数据添加到 list 数组中
        const { results } = data.data;
        // 数组的展开操作符， 它会把数组元素一个一个拿出来
        // 使用list.push的方法把新数组展开后的元素都追加到 list 中
        this.list.push(...results);
        console.log(results);

        // 3.设置本次加载中的 loading 状态结束
        // 本次数据加载结束之后，要把加载状态设置为结束
        this.loading = false;

        // 4.判断数据是否加载结束
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 没有数据了 讲 finished 设置为 true 不再加载更多
          this.finished = true;
        }
      } catch (error) {
        console.log(error);
        // 关闭 loading 效果
        this.loading = false;
        // 开启错误提示
        this.error = true;
      }
      // 异步更新数据
      // setTimeout 仅做 示列， 真实场景中一般为 ajax请求
    },
    async onRefresh() {
      console.log("onRefresh--->>>");
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        });

        // 摸拟随机失败的情况
        if (Math.random > 0.5) {
          console.log("random--->");
          JSON.parse("SDFASDFSD");
        }

        //2.将数据追加到列表的顶部
        const { results } = data.data;
        this.list.unshift(...results);

        //3.关闭下拉刷新的 loading 状态
        this.isreFreshLoading = false;

        // 4.更新下拉刷新 成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
      } catch (error) {
        console.log("请求失败", error);
        // 5.更新失败的提示文本
        this.isreFreshLoading = false;
        this.refreshSuccessText = "刷新失败";
      }
    }
  }
};
</script>

<style>
</style>