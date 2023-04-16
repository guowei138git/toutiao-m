import dayjs from 'dayjs'

// 引入Vue
import Vue from 'vue'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

// dayjs 默认语言是 英文，我们这里配置为中文
dayjs.locale('zh-cn') // 设置为全局使用

// 加载处理相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用 处理相对时间的插件
dayjs.extend(relativeTime)

//获取当前最新时间 
// dayjs() 
// 把获取到的当前最新时间以 YYYY-MM-DD 格式输出
// dayjs().format('YYYY-MM-DD')

// 定义一个全局过滤器，需先引入 Vue
// 其实过滤器就相当于一个全局可用的方法 （仅供模板使用）
// 参数1： 过滤器名称
// 参数2：过滤器函数 其中 value是传入的参数
// 使用方式： {{表达式 | 过滤器名称}}
// 管道符： | 前面的表达式的结果 会作为参数 传递到过滤器函数中
// 过滤器的返回值 return 会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
    // value为调用者传入的发布日期参数
    // .to() 计算传入的时间 距 当前时间  相差的时间
    // 比如：传入的时间是 2023-04-10  当前时间是 2023-04-17 那么相差的时间就是7天前
})