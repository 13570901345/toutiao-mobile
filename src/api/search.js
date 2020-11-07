import request from '@/utils/request'

// 获取搜索联想建议
export const getSearchsuggess = q => {
  return request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
/**
 * 获取搜索结果
 */
export const getSearch = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
/**
 * 获取搜索历史
 */
export const getSearchhistory = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
