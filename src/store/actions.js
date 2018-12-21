import * as types from './mutation-types'
import loginApi from '../service/loginApi'
export default {
  // 储存用户信息
  setUserInfo ({ commit }, params) {
    commit(types.RECORD_USERINFO, params)
  },
  // 获取用户信息
  getUserInfo ({ commit }, params) {
    return new Promise((resolve, reject) => {
      loginApi.getUser(params).then(res => {
        let rec = res.data
        commit(types.GET_USERINFO, { rec })
        resolve(rec)
      })
    })
  }
}
