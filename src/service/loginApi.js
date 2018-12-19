import commonApi from '../config/axiosConfig'

export default {
  // 获取验证码
  getCaptchas () {
    return commonApi.post('/api/v1/captchas')
  }
}
