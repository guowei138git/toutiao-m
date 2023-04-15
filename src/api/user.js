/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
// import store from '@/store'

// 用户登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

// 发送验证码
export const sendSms = mobile => {
    return request({
      method: 'GET',
      url: `/v1_0/sms/codes/${mobile}`
    })
  }

  // 获取用户自己的信息
  export const getUserInfo = () => {
    return request({
      method: 'GET',
      url: '/v1_0/user'
    })
  }

    // // 获取用户自己的信息V1 - 已过时，不推荐再使用
    // export const getUserInfoV1 = () => {
    //   return request({
    //     method: 'GET',
    //     url: '/v1_0/user',
    //     // 发送请求头数据
    //     headers: {
    //       Authorization: `Bearer ${store.state.user.token}`
    //     }
    //   })
    // }

    // 获取用户自己的频道信息
    export const getUserChannels = () => {
      return request({
        method: 'GET',
        url: '/v1_0/user/channels'
      })
    }