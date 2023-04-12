/**
 * 封装本地存储操作模块
 */

 // 存储数据
 export const setItem = (key, value) => {
     //将数组，对象类型的数据  转换为 JSON格式字符串
     if(typeof value === 'object'){
         value = JSON.stringify(value)
     }
     //将JSON格式的字符串存储到本地浏览器
     window.localStorage.setItem(key,value)
 }

// 获取数据
export const getItem = key => {
    const data = window.localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

// 删除数据
export const removeItem = key => {
    window.localStorage.removeItem(key)
}