<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <!--
            Tips: 在 van-search 外层增加 form 标签，且 action 不为空，
            即可在 iOS 输入法中显示搜索按钮
      -->
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
      ></van-search>
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <SearchResult 
    v-if="isResultShow" 
    :searchText="searchText"
    />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion 
    v-else-if="searchText" 
    :searchText="searchText"
    @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <SearchHistory v-else 
    :searchHistories="searchHistories"
    />
    <!-- /搜索历史记录 -->

  

   
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggest'
import SearchResult from './components/search-result'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      // 搜索框中的内容
      searchText: '',
      // 控制搜索结果的展示
      isResultShow: false,
      // 搜索的历史记录
      searchHistories: []
    }
  },
  methods: {
    onSearch (val) {
      console.log('onSearch:', val)
      // 更新文本框内容
      this.searchText = val

      // 存储搜索历史记录
      // this.searchHistories.push(val)

      // 优化存储搜历史记录S
      // 要求： 不要有重复历史记录
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        // 备注： indexOf方法 找到了返回 1 找不到返回 -1
        this.searchHistories.splice(index, 1)
      }
      // 要求：最新的排在最前面
      this.searchHistories.unshift(val)
       // 优化存储搜历史记录E

      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      console.log('onCancel')
      this.$router.back()
    },
    onFocus () {
      console.log('onFocus')
      this.isResultShow = false
    },
    
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 54px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
