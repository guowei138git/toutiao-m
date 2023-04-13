<template>
  <div class="my-container">
    <div class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'MyIndex'
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    // background-color: pink;
    // background: url("../../assets/banner.png");
    background: url("~@/assets/banner.png");
    // 缩放填充到整个背景当中
    background-size: cover;
  }
  .not-login {
    display: flex;
    // 水平居中
    justify-content: center;
    // 垂直居中
    align-items: center;
    .login-btn {
      display: flex;
      // 布局方向 - 列 上下布局 
      // 默认是水平布局方向
      flex-direction: column;
      // 水平居中
      justify-content: center;
      // 垂直居中
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
}
</style>