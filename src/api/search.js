/**
 * 搜索相关请求模块
 */
import request from '@/utils/request'

// 联想建议
export const getSearchSuggestions = (param) => {
    return request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params: {
            param
        }
    })
}