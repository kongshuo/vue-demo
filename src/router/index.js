// 路由的懒加载
/** home */
const home = r =>
  require.ensure([], () => r(require('../page/home/home')), 'home')
/** searchCity */
const searchCity = r =>
  require.ensure([], () => r(require('../page/home/searchCity')), 'searchCity')
/** login */
const login = r =>
  require.ensure([], () => r(require('../page/login/login')), 'login')
/** changePassWord */
const changePassWord = r =>
  require.ensure(
    [],
    () => r(require('../page/login/changePassWord')),
    'changePassWord'
  )
/** smite */
const smite = r =>
  require.ensure([], () => r(require('../page/smite/smite')), 'smite')
// 在此抛出一个routes配置,array
export default [
  {
    path: '',
    redirect: '/home' // 路径为'',重定向
  },
  {
    path: '/', // 默认进入home页面
    component: home,
    name: 'home',
    meta: {
      keepAlive: true // 设置组件是否缓存
    }
  },
  {
    path: '/home',
    component: home,
    name: 'home',
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/searchCity',
    component: searchCity,
    name: 'searchCity'
  },
  {
    path: '/login',
    component: login,
    name: 'login'
  },
  {
    path: '/changePassWord',
    component: changePassWord,
    name: 'changePassWord'
  },
  {
    path: '/smite',
    component: smite,
    name: 'smite'
  }
]
