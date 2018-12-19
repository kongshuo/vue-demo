// 路由的懒加载
/* home */
const home = r =>
  require.ensure([], () => r(require('../page/home/home')), 'home')
const searchCity = r =>
  require.ensure([], () => r(require('../page/home/searchCity')), 'searchCity')
/* login */
const login = r =>
  require.ensure([], () => r(require('../page/login/login')), 'login')
/* login */
const changePassWord = r =>
  require.ensure(
    [],
    () => r(require('../page/login/changePassWord')),
    'changePassWord'
  )
// 在此抛出一个routes配置,是一个数组
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
    name: 'searchCity',
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/login',
    component: login,
    name: 'login',
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/changePassWord',
    component: changePassWord,
    name: 'changePassWord',
    meta: {
      keepAlive: false
    }
  }
]
