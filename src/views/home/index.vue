<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn"
      slot="title"
      type="info"
      size="small"
      round
      icon="search"
      to="/search"
      >搜索</van-button>
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
    <ChannelEdit
    :myChannels="channels"
    :activeIndex="active"
    @update-active="onUpdateAcitve"
    />
    </van-popup>
    <!-- / 频道编辑弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        let channels = []
        if (this.user) {
          // 已登录，请求获取用户频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录，判断是否有本地(浏览器缓存中)频道列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            // 有，拿来使用
            channels = localChannels
          } else {
            // 没有，请求获取默认频道列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (error) {
        this.$toast('获取用户频道失败')
      }
    },
    async loadChannelsV1 () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (error) {
        this.$toast('获取用户频道失败')
      }
    },
    // ES6语法：参数默认值 - isChannelEditShow的默认值为 true
    onUpdateAcitve (index, isChannelEditShow = true) {
      // console.log('home', index)
      // 更新激活的频道项
      this.active = index
      // 关闭编辑频道弹层
      this.isChannelEditShow = isChannelEditShow
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  // 内上边距： 搜索栏的高 + 频道列表的高
  padding-top: 348px;
  padding-bottom: 200px;

  .van-nav-bar__title {
    // 去除最大宽度的限制
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28;
    .van-icon {
      font-size: 32px;
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

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 84px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777;
    }

    .van-tab--active {
      color: #333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 32px !important;
      height: 6px;
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
      width: 66px;
      height: 82px;
    }
    // 面包按钮
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
