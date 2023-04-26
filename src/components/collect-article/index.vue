<template>
  <van-button 
  :icon="value ? 'star' : 'star-o'" 
  :class="{
        collected: value
    }" />
</template>

<script>
export default {
  name: "CollectArticle",
  // 使用v-model 必须使用 value名来接收
  props: {
    value: {
      type: Boolean,
      required: true
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
