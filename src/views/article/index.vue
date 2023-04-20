<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar 
    class="page-nav-bar"
    title="黑马头条" 
    left-arrow > </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap">
        <van-loading 
        type="spinner"
        color="#3296fa"
        vertical>加载中...</van-loading>
      </div>
      <!-- /加载中 -->

    </div>

  </div>
</template>

<script>
export default {
  name: "ArticleIndex"
};
</script>

<style>
</style>