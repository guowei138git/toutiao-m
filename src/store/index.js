import Vue from 'vue'
import Vuex from 'vuex'
import {getItem, setItem} from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = "TOUTIAO_USER"


export default new Vuex.Store({
  state: {
    // 是一个对象，存储当前登录用户的信息
    // user: null
    //user:window.localStorage.getItem(TOKEN_KEY)
    // user:JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY)
  },
  getters: {
  },
  mutations: {
    setUser(state, data){
      state.user = data
      // 为了防止刷新丢失，把数据备份到本地村粗
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
