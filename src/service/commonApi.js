import request from 'axios'

export default {
  /**
   * 获取home默认地址
   * params
   */
  cityGuess (params) {
    let data = {
      url: '/v1/cities',
      method: 'get',
      data: '',
      type: 'guess'
    }
    Object.assign(data, params)
    return request(data)
  }
}
