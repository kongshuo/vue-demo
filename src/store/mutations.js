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
  },
  [types.SET_USERNAME] (state, userName) {
    state.setUserInfo = Object.assign({}, state.setUserInfo, { userName })
  },
  [types.RESET_ADDRESS] (state, newAddress) {
    state.newAddress = newAddress
  },
  [types.GEOHASH] (state, geohash) {
    state.geohash = geohash
  },
  [types.AFTER_ADDRESS] (state, obj) {
    state.afterAddress = [obj, ...state.afterAddress]
  },
  [types.SAVE_QUESTIONS] (state, questionList) {
    state.questions = { ...questionList }
  }
}
