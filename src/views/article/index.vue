<template>
  <!-- article-container-->
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar 
    class="page-nav-bar"
    title="黑马头条" 
    left-arrow > </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 中间主体区域 -->
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
     
    </div>
    <!-- / 加载完成-文章详情 -->

    <!-- 加载失败: 404 -->
    <div class="error-wrap">
      <van-icon name="failure"></van-icon>
      <p class="text">该资源不存在或已删除</p>
    </div>
    <!-- /加载失败: 404 -->

    <!-- 加载失败：其他未知错误（例如网络原因或服务异常） -->
    <div class="error-wrap">
      <van-icon name="failure"></van-icon>
      <p class="text">内容加载失败</p>
      <van-button class="retry-btn">点击重试</van-button>
    </div>
    <!-- /加载失败：其他未知错误（例如网络原因或服务异常） -->


    </div>
    <!-- /中间主体区域 -->

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button 
      class="comment-btn"
      type="default"
      round
      size="small">写评论</van-button>
      <van-icon
      name="comment-o"
      info="123"
      color="#777"
      />
      <van-icon
      name="star-o"
      color="#777"
       />
      <van-icon 
       name="good-job-o"
       color="#777"
      />
      <van-icon 
      name="share"
      color="#777"
      />
    </div>
    <!-- /底部区域 -->

  </div>
  <!-- /article-container-->
</template>

<script>
export default {
  name: "ArticleIndex"
};
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }

  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px, 16px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 9px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .publish-date {
        font-size: 12px;
        color: #b7b7b7;
      }
    }
  }


}
</style>