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
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',
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
