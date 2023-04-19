<template>
  <div class="search-suggestion">
    <van-cell 
    v-for="(text, index) in suggestions"
    :key="index"
    :title="text" 
    icon="search"></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'

// 按需加载 好处： 只把使用到的成员打包到结果中
import { debounce } from 'lodash'

export default {
  name: "SearchSuggestion",
  data () {
    return {
      // 联想建议数据列表
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // 当 searchText 发送改变的时候，
      // 就会调用 handler 函数
      // 注意： handler 函数名称是固定的
      handlerV1 (value) {
        console.log('watch handler', value)
        this.loadSearchSuggestions(value)
      },
      // debounce 函数 - 防抖
      // 参数1：一个函数
      // 参数2：延迟时间，单位是毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function (value) {
        console.log(value)
        this.loadSearchSuggestions(value)
      }, 200),
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestions (value) {
      try {
       const { data } = await getSearchSuggestions(value)
      //  console.log(data)
      this.suggestions = data.data.options
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
      }
    }
  }
};
</script>

<style>
</style>