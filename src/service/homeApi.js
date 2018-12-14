import commonApi from '../config/axiosConfig'

export default {
  /**
   * 获取首页默认地址
   */
  cityGuess () {
    return commonApi.get('/api/v1/cities', { type: 'guess' })
  }
}
