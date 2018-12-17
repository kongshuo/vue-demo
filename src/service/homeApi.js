import commonApi from '../config/axiosConfig'

export default {
  /**
   * 获取首页默认地址
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
  }
}
