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

    <!-- 加载完成-文章详情 -->
    <div class="article-detail">
      <!-- 文章标题 -->
      <h1 class="article-title">这是文章标题</h1>
      <!-- /文章标题 -->

      <!-- 用户信息 -->
      <van-cell class="user-info" center :border="false">
        cell单元格
      </van-cell>
      <!-- /用户信息 -->

    </div>

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