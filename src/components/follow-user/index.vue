<template>
  <!-- 关注用户 -->
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="loding"
    @click="onFollow"
  >已关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loding"
    @click="onFollow"
  >关注</van-button>
  <!-- /关注用户 -->
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";
export default {
  name: "FollowUser",
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loding: false
    };
  },
  methods: {
    async onFollow() {
      this.loding = true;
      try {
        if (this.isFollowed) {
          // 已关注 -> 取消关注
          const { data } = await deleteFollow(this.userId);
          console.log("取消关注=>", data);
          // this.article.is_followed = false;
        } else {
          // 未关注 -> 添加关注
          const { data } = await addFollow(this.userId);
          console.log("添加关注=>", data);
          // this.article.is_followed = true;
        }
      } catch (error) {
        console.log('error', error)
        let message = "操作失败，请重试";
        if (error.response && error.response.status === "400") {
          message = "你不能关注你自己";
        } else if (error.status = '401') {
          message = "你还未登录，请先登录"
        }
        this.$toast(message);
      } finally {
        // 无论成功或失败都关闭 loading
        this.loding = false;
      }
      // 更新视图状态
      // update-is_followed: 父组件中的方法
      // !this.isFollowed: 事件参数
      this.$emit("update-is_followed", !this.isFollowed);
    }
  }
};
</script>

<style>
</style>