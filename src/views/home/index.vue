<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"> 
      <van-button
      class="search-btn"
      slot="title"
      type="info"
      size="small"
      round
      icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 频道列表 -->
      <!--
      通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签
      通过 animated 属性可以开启切换标签内容时的转场动画
      通过 swipeable 属性可以开启滑动切换标签页
     -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
      <van-tab title="标签 6">内容 6</van-tab>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo" > </i>
      </div>
    </van-tabs>
    <!-- / 频道列表 -->
  </div>
</template>

<script>
export default {
    name: 'HomeIndex',
    data () {
      return {
        active: 0
      }
    }
}
</script>

<style scoped lang="less">
.home-container {
  .van-nav-bar__title {
    // 去除最大宽度的限制
    max-width: unset;
  }
  .search-btn{
    width: 278px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    font-size: 14;
    .van-icon {
      font-size: 16px;
    }
  }
  // padding-top: 87px;
  // padding-bottom: 50px;

  .page-nav-bar {
    background-color: #3296fa;
    .van-icon {
      color: #fff;
    }
  }

  /deep/.channel-tabs {
    .van-tabs_wrap{
      height: 42px;
    }
    .van-tab {
      min-width: 100px;
      border-right: 2px solid #edeff3;
      font-size: 15px;
      color: #777;
    }
    .van-tab-active {
      color: #333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 4px;
      width: 15px !important;
      height: 3px;
      background-color: #3296fa;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33px;
      height: 41px;
      background-color: #fff;
      opacity: 0.902;
    }
  }
}
</style>