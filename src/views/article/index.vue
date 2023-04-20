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
       
        <van-image 
        class="avatar"
        slot="icon"
        round
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>

        <!-- cell单元格内容 -->
        <div slot="title" class="user-name">黑马头条号</div>
        <div slot="label" class="publish-data">14小时前</div>

        <van-button
        class="follow-btn"
        type="info"
        color="#3296fa"
        round
        size="small"
        icon="plus">关注</van-button>
      </van-cell>
      <!-- /用户信息 -->

       <!-- 文章内容 -->
      <div class="article-content">这是文章内容</div>
      <van-divider>正文结束</van-divider>
      <!-- /文章内容 -->
     
    <!-- / 加载完成-文章详情 -->
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