<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini">编辑</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        icon="clear"
      >
        <!-- 
          v-bind:class 语法
          一个对象， 对象中的 key 表示 是要作用的 CSS类名
                    对象中的 value 表示 是要计算出来的布尔值
                        true: 则作用该类名
                        false: 则不作用该类名
        -->
        <span class="text" :class="{active: index === activeIndex}" slot="text">{{channel.name}}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell>
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="20">
      <van-grid-item class="grid-item" v-for="value in 8" :key="value" icon="plus" text="推荐内容" />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: "ChannelEdit",
  data () {
    return {
      allChannels: [] // 所有频道数据
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  components: {},
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels(){
      try {
        const {data} = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (error) {
        this.$toast('获取所有频道列表失败')
      }
    }
  }
};
</script>

<style scoped lang="less">
.channel-edit {
  // 内边距设置 上下42px 左右0px
  padding: 42px 0;
}

.title-text {
  font-size: 16px;
  color: #333;
}

.edit-btn {
  width: 52px;
  height: 24px;
  font-size: 13px;
  color: #f85959;
  border: 1px solid #f85959;
}

/deep/ .grid-item {
  width: 80px;
  height: 43px;
  .van-grid-item__content {
    // 不折行
    white-space: nowrap;
    // 背景色
    background-color: #f4f5f6;
    .van-grid-item__text,
    .text {
      font-size: 14px;
      color: #222;
      margin-top: 0;
    }
    .active {
      color: red;
    }
  }
}

/deep/ .recommend-grid {
  .grid-item {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 14px;
        margin-right: 3px;
      }
    }
    // .van-grid-item__text {
    //   margin-top: 0;
    // }
  }
}

/deep/ .my-grid {
  .grid-item {
    .van-icon-clear {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 15px;
      color: #cacaca;
      z-index: 2;
    }
  }
}
</style>