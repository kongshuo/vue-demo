import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
Vue.use(Vuex)
const state = {
  setUserInfo: '', // 储存用户信息
  getUserInfo: '', // 获取用户信息
  isLogin: false, // 用户是否已经登录
  newAddress: '' // 收获地址
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
