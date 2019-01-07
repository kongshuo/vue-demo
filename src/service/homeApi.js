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
   * 获取当前城市搜索地址
   */
  getSearchAddress (cityId, SearchAddress) {
    return commonApi.get('/api/v1/pois', {
      type: 'search',
      city_id: cityId,
      keyword: SearchAddress
    })
  },
  /**
   * 搜索地址
   */
  searchNearby (SearchAddress) {
    return commonApi.get('/api/v1/pois', {
      type: 'nearby',
      keyword: SearchAddress
    })
  },
  /**
   * 新增收获地址
   */
  newHaveAddress (params) {
    return commonApi.post('/api/v1/users/' + params.userId + '/addresses', {
      address: params.address,
      address_detail: params.address_detail,
      geohash: params.geohash,
      name: params.name,
      phone: params.phone,
      phone_bk: params.phone_bk,
      poi_type: 0,
      sex: 1,
      tag: '公司',
      tag_type: 4
    })
  }
}
