<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{
        collected: value
    }"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
import { addCollect, deleteCollect } from "@/api/article";

export default {
  name: "CollectArticle",
  // 使用v-model 必须使用 value名来接收
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loding: false
    };
  },
  methods: {
    async onCollect() {
      this.loding = true;
      try {
          if (this.value) {
              // 已收藏 -> 取消收藏

          } else {
              // 未收藏 -> 添加收藏

          }
      } catch (error) {
          this.$toast.fail('操作失败，请重试')
      }
      this.loding = false;
    }
  }
};
</script>

<style lang="less" scoped>
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>>
</style>
