<template>
  <!-- article-container-->
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条" left-arrow></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 中间主体区域 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading type="spinner" color="#3296fa" vertical>加载中...</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成 -文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo"></van-image>

          <!-- cell单元格内容 -->
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-data">{{article.pubdate | relativeTime}}</div>

          <!-- 关注用户 -->
          <!--
            模板中的 $event 是事件参数
          -->
          <follow-user
            class="follow-btn"
            :is-followed="article.is_followed"
            :user-id="article.aut_id"
            @update-is_followed="article.is_followed = $event"
          />
          <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            :loading="followLoading"
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
            :loading="followLoading"
            @click="onFollow"
          >关注</van-button>-->
          <!-- /关注用户 -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content" ref="article-content">
          <!-- 这是文章内容..... -->
        </div>
        <van-divider>正文结束</van-divider>
        <!-- /文章内容 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small">写评论</van-button>
          <van-icon name="comment-o" info="123" color="#777" />
          <!-- 收藏 -->
          <!-- <van-icon name="star-o" color="#777" /> -->
          <collect-article 
            class="btn-item" 
            v-model="article.is_collected" 
            :article-id="article.art_id"
          />
          <!-- /收藏 -->
          <van-icon name="good-job-o" color="#777" />
          <van-icon name="share" color="#777" />
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- / 加载完成 -文章详情 -->

      <!-- 加载失败: 404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure"></van-icon>
        <p class="text">该资源不存在或已删除</p>
      </div>
      <!-- /加载失败: 404 -->

      <!-- 加载失败：其他未知错误（例如网络原因或服务异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure"></van-icon>
        <p class="text">内容加载失败</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其他未知错误（例如网络原因或服务异常） -->
    </div>
    <!-- /中间主体区域 -->
  </div>
  <!-- /article-container-->
</template>

<script>
import { getArticleById } from "@/api/article";
import { ImagePreview } from "vant";
import FollowUser from "@/components/follow-user";
import CollectArticle from "@/components/collect-article";

// ImagePreview([
//   'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
//   'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
//   'https://img.yzcdn.cn/2.jpg'
// ])

export default {
  name: "ArticleIndex",
  data() {
    return {
      article: {}, // 文章详情
      loading: true, // 加载中的 loading 状态
      errStatus: 0, // 失败的状态码
      followLoading: false // 关注的 loading
    };
  },
  props: {
    // 使用组件Props解耦路由参数
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  components: {
    // FollowUser:FollowUser,
    FollowUser,
    CollectArticle
  },
  created() {
    this.loadArticle();
  },
  methods: {
    async loadArticle() {
      // 开启加载中的状态
      this.loading = true;
      try {
        const articleId = this.$route.params.articleId;
        console.log("articleId:", articleId);
        const { data } = await getArticleById(articleId);
        console.log("getArticleById resposne:", data);
        // 摸拟加载失败情况 仅用于测试
        // if (Math.random() > 0.5) {
        //   JSON.parse('danfsagklhaulkl')
        // }
        // 摸拟加载失败情况 仅用于测试

        // 数据驱动视图 这件事儿 不是立即的
        this.article = data.data;

        // 初始化图片点击预览
        // console.log(this.$refs['article-content'])
        setTimeout(() => {
          // console.log(this.$refs['article-content'])
          this.previewImage();
        }, 0);

        // 请求成功， 关闭 Loading
        // this.loading = false
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404;
        }
        // 请求失败， 关闭 loading
        //  this.loading = false
        console.log("获取数据失败", error);
      }
      // 无论成功还是失败，都需要关闭 loading
      this.loading = false;
    },
    previewImage() {
      // 得到文章内容的所有 dom
      const articleContent = this.$refs["article-content"];
      // 得到所有的 img 节点
      const imgs = articleContent.querySelectorAll("img");
      console.log(imgs);
      // 定义一个数组
      const imagesArr = [];
      // 遍历所有 img 节点
      imgs.forEach((img, index) => {
        const imageURl = this.getCaption(img.src, "url=");
        console.log("imageURl=", imageURl);
        imagesArr.push(imageURl);
        // 给每个img节点注册点击事件
        img.onclick = () => {
          // 在 img 点击事件处理函数中  调用 ImagePreview 预览
          ImagePreview({
            // 预览的图片地址 数组
            images: imagesArr,
            // 起始位置  从 0 开始
            startPosition: index
          });
        };
      });
      console.log(imagesArr);
    },
    // 截取指定字符后面的内容
    getCaption(str, subStr) {
      const index = str.lastIndexOf(subStr);
      const res = str.substring(index + subStr.length, str.length);
      console.log(res);
      return res;
    }
  }
};
</script>

<style scoped lang="less">
// 引入 css 样式文件
@import "./github-markdown.css";

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }

  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px, 16px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 9px;
      }

      .van-cell__label {
        margin-top: 0;
      }

      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }

      .publish-date {
        font-size: 12px;
        color: #b7b7b7;
      }

      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 28px 16px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .laoding-warap {
    padding: 100px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    .van-icon {
      font-size: 61px;
      color: #b4b4b4;
    }
    .text {
      font-size: 15px;
      margin: 17px 0 23px;
      color: #666;
    }
    .retry-btn {
      width: 140px;
      height: 35px;
      line-height: 35px;
      font-size: 16px;
      color: #666;
      border: 1px solid #c3c3c3;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    // height: 44px;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }

    /deep/ .van-icon {
      font-size: 40px;
    }

    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777;
    }
  }
}
</style>
