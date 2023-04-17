<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini">
          编辑</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item 
      class="grid-item" 
      v-for="(channel, index) in myChannels" 
      :key="index" 
      icon="clear" 
      :text="channel.name" />
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
export default {
  name: "ChannelEdit",
  props: {
      myChannels: {
          type: Array,
          required: true
      }
  },
  components: {
      
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
    background-color: #f4f5f6;
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
    .van-grid-item__text {
      margin-top: 0;
    }
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