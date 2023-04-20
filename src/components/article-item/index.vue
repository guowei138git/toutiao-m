<template>
  <!-- <div>文章列表项</div> -->
  <van-cell 
  class="article-item"
  :to="{
    name: 'article',
    params: {
      articleId: article.art_id
    }
  }"
  >
    <div slot="title" class="title">{{article.title}}</div>
    <div slot="label">
        <div class="cover-wrap">
            <div class="cover-item"
            v-for="(img, index) in article.cover.images"
            :key="index">
                <van-image 
                    width="100"
                    height="100"
                    :src="img"
                />
            </div>
        </div>
      <div>
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image
    v-if="article.cover.type === 1"
    slot="default"
    width="100"
    height="100"
    :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped lang="less">

</style>