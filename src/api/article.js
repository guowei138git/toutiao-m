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

// 根据id获取指定文章
export const getArticleById = (articleId) => {
    return request({
        method: 'GET',
        url: `/v1_0/articles/${articleId}`
    })
}

// 收藏文章
export const addCollect = (target) => {
    return request({
        method: 'POST',
        url: '/v1_0/article/collections',
        data: {
            target
        }
    })
}

// 取消收藏文章
export const deleteCollect = (target) =>{
    return request({
        method: 'DELETE',
        url: `/v1_0/article/collections/${target}`
    })
}