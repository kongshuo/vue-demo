import * as types from './mutation-types'
import localStorageApi from '../config/localStore'
export default {
  // 将用户信息放在state中
  [types.RECORD_USERINFO] (state, info) {
    state.setUserInfo = info
    state.isLogin = true
    localStorageApi.setStorage('user_id', info.user_id)
  },
  [types.GET_USERINFO] (state, info) {
    state.getUserInfo = info
    state.isLogin = true
  }
}
