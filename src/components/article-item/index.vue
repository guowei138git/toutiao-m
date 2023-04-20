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
    <div slot="title" class="title" van-multi-ellipsis--12>{{article.title}}</div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
          <van-image class="cover-item-img" fit="cober" :src="img" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      class="right-cover"
      fit="cover"
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
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }

  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .van-cell__value {
    flex: unset;
    padding-left: 12px;
    width: 116px;
    height: 74px;
  }

  .right-cover {
    width: 100%;
    height: 100px;
  }

  .cover-wrap {
    display: flex;
    padding: 15px 0;
    .cover-item {
      flex: 1;
      height: 74px;
      &:not(:last-child){
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 74px;
      }
    }
  }

  .label-info-wrap span {
    font-size: 11px;
    color: #b4b4b4;
    margin-right: 13px;
  }
}
</style>