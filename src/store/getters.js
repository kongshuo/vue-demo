export default {
  setUserInfo: state => {
    return state.userInfo // 设置用户名
  },
  isLogin: state => {
    return state.isLogin // 用户是否已登录
  },
  getUserInfo: state => {
    return state.userInfo // 获取用户名
  }
}
