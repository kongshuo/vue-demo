import commonApi from '../config/axiosConfig'
export default {
  // 获取search页搜索结果
  getSearchResult (params) {
    return commonApi.get('/api/v4/restaurants', {
      'extras[]': 'restaurant_activity',
      type: 'search',
      geohash: params.geohash,
      keyword: params.keyword
    })
  }
}
