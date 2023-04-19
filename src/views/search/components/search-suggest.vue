<template>
  <div class="search-suggestion">
    <van-cell title="黑马程序员..." icon="search"></van-cell>
    <van-cell title="千与千寻..." icon="search"></van-cell>
    <van-cell title="天空战记..." icon="search"></van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchSuggestion",
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // 当 searchText 发送改变的时候，
      // 就会调用 handler 函数
      // 注意： handler 函数名称是固定的
      handler (value) {
        console.log('watch handler', value)
      },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  }
};
</script>

<style>
</style>