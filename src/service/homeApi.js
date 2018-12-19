import commonApi from '../config/axiosConfig'

export default {
  /**
   * 获取首页当前定位地址
   */
  cityGuess () {
    return commonApi.get('/api/v1/cities', { type: 'guess' })
  },
  /**
   * 获取首页热门地址
   */
  cityHot () {
    return commonApi.get('/api/v1/cities', { type: 'hot' })
  },
  /**
   * 获取全部地址
   */
  cityAll () {
    return commonApi.get('/api/v1/cities', { type: 'group' })
  },
  /**
   * 获取当前城市
   */
  currentCity (cityId) {
    return commonApi.get('/api/v1/cities/' + cityId)
  },
  /**
   * 获取搜索地址
   */
  getSearchAddress (cityId, SearchAddress) {
    return commonApi.get('/api/v1/pois', {
      type: 'search',
      city_id: cityId,
      keyword: SearchAddress
    })
  }
}
