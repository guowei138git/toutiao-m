<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
      <!-- 基本信息 -->
      <div class="base-info">
        <div class="left">
          <van-image 
          class="avatar" 
          :src="userInfo.photo" 
          round 
          fit="cover" />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 统计信息 -->
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- / 已登录头部 -->

    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- / 未登录头部 -->


    <!-- 宫格导航 -->
    <van-grid class="grid-nav mb-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- / 宫格导航 -->

    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link  />
    <van-cell 
    v-if="user" 
    title="退出登录" 
    class="logout-cell" 
    @click="onLogout"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getUserInfo} from '@/api/user'
export default {
  name: "MyIndex",
  data () {
    return {
      // 用户信息
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    // 如果用户登录了，则请求加载获取用户信息
    if(this.user){
      this.loaduserInfo()
    }
  },
  methods: {
    onLogout(){
      console.log('onLogout')
      // 退出提示
      this.$dialog.confirm({
        title: '确认退出码？'
      }).then(() => {
        console.log('确认执行这里')
        this.$store.commit('setUser', null)
      }).catch(() => {
        console.log('取消执行这里')
      })
    },
    // 加载获取用户信息
    async loaduserInfo(){
      try {
        const {data} = await getUserInfo()
        console.log(data)
        // 数据绑定到 userInfo 上
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取用户数据失败，请稍后重试')
      }
    }
  }
};
</script>


<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 66px;
          height: 66;
          border: 1px solid #fff;
          margin-right: 16px;
        }
        .name {
          font-size: 16px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 16px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 14px;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
