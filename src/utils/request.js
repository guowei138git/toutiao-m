/**
 * 请求模块
 */
import axios from 'axios'

const request = axios.create({
    //  接口的基准路径 http://toutiao.itheima.net
   baseURL: 'http://toutiao.itheima.net'
 })

 export default request
