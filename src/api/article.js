/**
 * 文章接口模块
 */
import request from '@/utils/request'

// 获取频道的文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        // `http://toutiao.itheima.net/v1_0/articles?channel_id=${cataId}&timestamp=${Date.now()}&with_top=1`) 
        url: '/v1_0/articles',
        //url: '/v1_1/articles',
        params
    })
}
