import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/local/zh-cn'

// dayjs 默认语言是 英文，我们这里配置为中文
dayjs.locale('zh-cn') // 设置为全局使用

// dayjs() 获取当前最新时间
dayjs().format('YYYY-MM-DD')