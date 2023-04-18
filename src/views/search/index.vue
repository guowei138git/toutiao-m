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
      ></van-search>
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索历史记录 -->
    <SearchHistory/>
    <!-- /搜索历史记录 -->

    <!-- 联想建议 -->
    <SearchSuggestion/>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <SearchResult />
    <!-- /历史记录 -->
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
      searchText: ''
    }
  },
  methods: {
    onSearch (val) {
      console.log('onSearch:', val)
    },
    onCancel () {
      console.log('onCancel')
      this.$router.back()
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
