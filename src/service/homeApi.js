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
    let data = {
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
    }
    return commonApi.post('/api/v1/users/' + params.userId + '/addresses', data)
  },
  /**
   * 获取我的优惠中的红包数量
   */
  getHongBaoNum (params) {
    return commonApi.get(
      '/api/promotion/v2/users/' + params.id + '/hongbaos?limit=20&offset=0'
    )
  },
  /**
   * 获取我的优惠中的历史红包
   */
  getHbHistory (params) {
    return commonApi.get(
      '/api/promotion/v2/users/' +
        params.id +
        '/expired_hongbaos?limit=20&offset=0'
    )
  },
  /**
   * 兑换红包
   */
  exchangeHb (params) {
    return commonApi.post('/api/v1/users/' + params.id + '/hongbao/exchange', {
      exchange_code: params.exchangeCode,
      captcha_code: params.captchaCode
    })
  },
  /**
   * 服务中心
   */
  getQuestions (params) {
    return commonApi.get('/api/v3/profile/explain')
  },
  /**
   *兑换会员卡
   */
  exchangeVipCard (params) {
    return commonApi.post(
      '/api/member/v1/users/' + params.id + '/delivery_card/physical_card/bind',
      { number: params.number, password: params.password }
    )
  },
  /**
   *根据经纬度获取地址
   */
  getGeohashAddress (params) {
    return commonApi.get('/api/v2/pois/' + params.geohash)
  },
  /**
   *获取食品分类类别
   */
  getFoodTypes (params) {
    return commonApi.get('/api/v2/index_entry', {
      geohash: params.geohash,
      group_type: '1',
      'flags[]': 'F'
    })
  },
  /**
   *获取定位附近商家列表
   */
  getShopList (params) {
    let supportStr = ''
    params.support_ids.forEach(item => {
      if (item.status) {
        supportStr += '&support_ids[]=' + item.id
      }
    })
    let data = {
      latitude: params.latitude,
      longitude: params.longitude,
      offset: params.offset,
      limit: '20',
      'extras[]': 'activities',
      keyword: '',
      restaurant_category_id: params.restaurant_category_id,
      'restaurant_category_ids[]': params.restaurant_category_ids,
      order_by: params.order_by,
      'delivery_mode[]': params.delivery_mode + supportStr
    }
    return commonApi.get('api/shopping/restaurants', data)
  }
}
