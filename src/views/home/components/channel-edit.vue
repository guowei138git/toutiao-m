<template>
  <div class="channel-edit">
      <van-cell :border="false">
          <div slot="title" class="title-text">我的频道</div>
          <van-button
          class="edit-btn"
          type="danger"
          plain
          round
          size="mini">编辑</van-button>
      </van-cell>
      <van-grid :gutter="10">
          <van-grid-item 
          class="grid-item"
          v-for="value in 8"
          :key="value"
          text="文字"
          />
      </van-grid>

      <!-- 频道推荐 -->
      <van-cell>
          <div slot="title" class="title-text">频道推荐</div>
      </van-cell>
      <van-grid :gutter="20">
          <van-grid-item
          class="grid-item"
          v-for="value in 8"
          :key="value"
          text="推荐内容"
          />
      </van-grid>
      <!-- /频道推荐 -->
  </div>
</template>

<script>
export default {
    name: 'ChannelEdit',
}
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
            background-color: #f4f5f6;
        }
    }
</style>