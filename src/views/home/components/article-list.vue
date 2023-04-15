<template>
  <div class="article-list">
      <van-list 
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad">
          <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
      </van-list>
  </div>
</template>

<script>
import {getArticles} from '@/api/article'

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
      console.log('onLoad')
       try {
            // 1.请求获取数据
           const {data} = await getArticles({
               channel_id: this.channel.id,
               timestamp: this.timestamp || Date.now(),
               with_top: 1
           })
           console.log('getArticles--->')
           // 2.把数据添加到 list 数组中
           const {results} = data.data
           this.list.push(...results)
           console.log(results)
          // 3.设置本次加载中的 loading 状态结束
          this.loading = false
          // 4.判断数据是否加载结束
          if (results.length) {
             // 更新获取下一页数据的时间戳
             this.timestamp = data.data.pre_timestamp  
          } else {
              // 没有数据了
              this.finished = true
          } 

       } catch (error) {
           console.log(error)
           // 关闭 loading 效果
           this.loading = false
           // 开启错误提示
           this.error = true
       } 
      // 异步更新数据
      // setTimeout 仅做 示列， 真实场景中一般为 ajax请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }

    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 1000);
    }
  }
};
</script>

<style>
</style>