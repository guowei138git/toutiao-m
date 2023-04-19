<template>
  <div class="search-result">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有等多了"
    @load="onLoad"
    >
      <van-cell
      v-for="(article, index) in list"
      :key="index"
      :title="article.title"></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
    name:'SearchResult',
    props: {
      searchText: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        list: [],
        loading: false,
        finished: false,
        page: 1,
        perPage: 10
      }
    },
    methods: {
      async onLoad () {
        try { 
          // 1.请求获取数据 - 搜索结果
          const { data } = await getSearchResult({
            page: this.page, // 页码
            per_page: this.perPage, // 每页大小
            q: this.searchText  // 查询关键词
          })
          console.log(data)

          // 2.将数据添加到数组中
          const { results } = data.data
          this.list.push(...results)

          // 3.将本次加载中的 loading 关闭
          this.loading = false

         // 4.判断是否还有数据 ？
         if (results.length) {
            //  如果有，则更新获取下一页数据的 页面
            this.page++
         } else {
           // 如果没有，则将加载状态 finished 设置为结束
           this.finished = true
         }

        } catch (error) {
          this.$toast('获取搜索结果失败，请稍后重试')
        }
        
        
     
      },

      onLoadV1 () {
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1)
          } 
          // 加载状态结束
          this.loading = false

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true
          }
        }, 1000)
      },
    }
}
</script>

<style>

</style>