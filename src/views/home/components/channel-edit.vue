<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon v-show="isEdit && !fixChannels.includes(channel.id)" slot="icon" name="clear"></van-icon>
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
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommondChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels } from "@/api/channel";

export default {
  name: "ChannelEdit",
  data() {
    return {
      // 所有频道数据
      allChannels: [],
      // 控制编辑状态的显示
      isEdit: false,
      // 固定频道 不允许删除  频道 id = 0
      fixChannels: [0]
    };
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
  computed: {
    recommondChannels() {
      // 数组的 filter 方法： 遍历数组，把复合条件的元素存储到新数组中
      return this.allChannels.filter(channel => {
        //  const channels = []

        // 数组的 find 方法： 遍历数组，把复合条件的第一个元素返回
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id;
        });
        // return channels
      });
    },
    // 推荐频道 = 所有频道- 我的频道
    recommondChannelsV1() {
      const channels = [];
      this.allChannels.forEach(channel => {
        // find 遍历数组 找到满足条件的元素项
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id;
        });
        // 如果我的频道中部包括该频道项
        // 则收集到 推荐频道中
        if (!ret) {
          channels.push(channel);
        }
      });
      // 把计算结果返回
      return channels;
    }
  },
  created() {
    this.loadAllChannels();
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        this.allChannels = data.data.channels;
      } catch (error) {
        this.$toast("获取所有频道列表失败");
      }
    },
    onAddChannel(channel) {
      console.log("onAddChannel--->");
      this.myChannels.push(channel);
    },
    onMyChannelClick(channel, index) {
      // 频道是否是编辑状态
      if (this.isEdit) {
        // 如果是固定频道，则不删除
        if (this.fixChannels.icludes(channel.id)) {
          // 直接 结束执行
          return
        }
        if (index <= this.activeIndex) {
          // 如果要删除的索引 小于等于 当前高亮的索引
          // 那就让激活频道的索引 -1
          // true: isChannelEditShow - 显示弹出层
          this.$emit("update-active", this.activeIndex - 1, true);
        }
        // 编辑状态，执行删除频道
        // 参数1： 要删除的元素的开始索引（包括）
        // 参数2：要删除的个数，如果不指定，则从参数1开始一直删除
        this.myChannels.splice(index, 1);
      } else {
        // 非编辑状态， 执行切换频道
        // false: isChannelEditShow - 关闭弹出层
        this.$emit("update-active", index, false);
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
    .van-grid-item__icon-wrapper {
      // 去掉定位 - 父相
      position: unset;
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