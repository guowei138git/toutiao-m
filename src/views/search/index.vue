<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
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
    <SearchResult v-if="isResultShow" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion v-else-if="searchText" />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <SearchHistory v-else />
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
      isResultShow: false
    }
  },
  methods: {
    onSearch (val) {
      console.log('onSearch:', val)
      this.isResultShow = true
    },
    onCancel () {
      console.log('onCancel')
      this.$router.back()
    },
    onFocus () {
      console.log('onFocus')
      this.isResultShow = false
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
