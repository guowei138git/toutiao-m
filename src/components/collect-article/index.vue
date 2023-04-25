<template>
  <van-icon name="star-o" color="#777" />
</template>

<script>
export default {
  name: 'CollectArticle',
  // 使用v-model 必须使用 value名来接收
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style>
</style>
