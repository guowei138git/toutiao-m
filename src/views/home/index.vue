<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" 
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
      <van-tab 
      v-for="channel in channels"
      :key="channel.id"
      :title="channel.name"> 
        <!-- 频道的文章列表 -->
        <ArticleList :channel="channel" />
        <!-- / 频道的文章列表 -->
      </van-tab>
      <!-- <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
      <van-tab title="标签 6">内容 6</van-tab> -->
      <!-- 占位 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" 
      class="hamburger-btn"
      @click="isChannelEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- / 频道列表 -->

    <!-- 频道编辑弹出层 -->
    <van-popup 
    v-model="isChannelEditShow"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{height: '100%'}"
    >
    <ChannelEdit />
    </van-popup>
    <!-- / 频道编辑弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'

export default {
  name: "HomeIndex",
  data() {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false,
    };
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels();
        this.channels = data.data.channels
      } catch (error) {
        this.$toast('获取用户频道失败')
      }
    }
  }
};
</script>

<style scoped lang="less">
.home-container {
  // 内上边距： 搜索栏的高 + 频道列表的高
  padding-top: 87px;
  padding-bottom: 50px;
  .van-nav-bar__title {
    // 去除最大宽度的限制
    max-width: unset;
  }
  .search-btn {
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
    .van-tabs_wrap {
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

    .van-tabs__wrap {
      position: fixed;
      top: 46px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 41px;
    }
    
    .placeholder {
      // 0  不参与剩余空间计算
      flex-shrink: 0;
      width: 33px;
      height: 41px;
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
      i.toutiao {
        font-size: 18px;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>