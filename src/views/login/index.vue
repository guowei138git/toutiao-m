<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" >
      <van-icon 
      slot="left" 
      name="cross" 
      @click="$router.back()"
      />
    </van-nav-bar>

    <!-- /导航栏 -->

    <!-- 登录表单  @submit="onSubmit"-->
    <!--
      表单验证：
        1、给 van-field 组件配置 rules 验证规则
          参考文档：https://youzan.github.io/vant/#/zh-CN/form#rule-shu-ju-jie-gou
        2、当表单提交的时候会自动触发表单验证
           如果验证通过，会触发 submit 事件
           如果验证失败，不会触发 submit
    -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          required
          clearable
          name="mobile"
          placeholder="请输入手机号"
          :rules="userFormRules.mobile"
          type="number"
          maxlength="11"
        >
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field 
        v-model="user.code" required type="number" 
        name="验证码" 
        placeholder="请输入验证码" 
        :rules="userFormRules.code">
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
          <template #button>
            <!-- time: 倒计时的时间 -->
            <van-count-down 
            v-if="isCountDownShow"
            :time="1000 * 10"
            format="ss s" 
            @finish="isCountDownShow = false"
            />
            <van-button 
            v-else
            class="send-sms-btn" 
            round
            size="small"
            type="default"
            @click="onSendSms"
            native-type="button">发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>

      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "",
        code: ""
      },
      userFormRules:{
        mobile: [
          {
            required: true,
            message: "手机号不能为空"
          },
          {
            // 第一位为1开头， 第二位可以是3|5|7|8 后面的9位都是数字d
            pattern: /^1[3|5|7|8|]\d{9}$/,
            message: "手机号格式错误"
          }
        ],
        code:[
          {
            required:true,
            message:'请填写验证码'
          },
          {
            pattern: /^\d{6}$/,
            message:'验证码格式错误'
          }
        ]
      },
      // 是否渲染倒计时组件
      isCountDownShow:false
    };
  },

  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      console.log("onSubmit");
      // 1. 获取表单数据
      const user = this.user;
      console.log(user);

      // TODO: 2.表单验证

      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: "登录中..." // 提示消息
      });


      // 3. 提交表单 请求登录
      try {
        // 调后端接口-请求登录
        const {data} = await login(user);
        console.log("登录成功", data);
        this.$store.commit('setUser', data.data)
        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success("登录成功");
        // 登录成功，跳转回原来页面
        // 说明：back的方式不严谨，后面讲功能优化的时候再说
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          console.log("登录失败", err);
          // alert(err)
          this.$toast.fail("登录失败，请稍后重试");
        }
      }
    },
    async onSendSms(){
      console.log('onSendSms')
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('loginForm.validate->验证通过')
      } catch (error) {
        return console.log('验证失败', error)
      }
      console.log('123')
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        // console.log('发送成功')
        this.$toast('发送成功')
      } catch (error) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if(error.response.status == 429){
          this.$toast('发送频繁，请稍后重试')
        }else{
           console.log('发送失败', error)
        }
       
      }
      

    }
  }
};
</script>

<style lang="less">
// 登录页导航
.page-nav-bar {
  background-color: #3296fa;
  .van-nav-bar__title, .van-icon {
    color: #fff;
  }
}

.login-container {
  .toutiao {
    // font-size: 37px;
  }
  .send-sms-btn {
    width: 78px;
    height: 26px;
    line-height: 26px;
    background-color: #ededed;
    font-size: 8px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>