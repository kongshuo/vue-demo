/**
 * 路由的懒加载
 * const searchAddress = resolve =>
 * require(['../page/login/address/searchAddress'], resolve)
 */

// 使用webpack的ensure

/**
 * home
 */
const home = r =>
  require.ensure([], () => r(require('../page/home/home')), 'home')
/**
 * searchCity
 */
const searchCity = r =>
  require.ensure([], () => r(require('../page/home/searchCity')), 'searchCity')
/**
 * login
 */
const login = r =>
  require.ensure([], () => r(require('../page/login/login')), 'login')
/**
 * changeUserName
 */
const changeUserName = r =>
  require.ensure(
    [],
    () => r(require('../page/login/changeUserName')),
    'changeUserName'
  )
/**
 * changePassWord
 */
const changePassWord = r =>
  require.ensure(
    [],
    () => r(require('../page/login/changePassWord')),
    'changePassWord'
  )
/**
 * smite
 */
const msite = r =>
  require.ensure([], () => r(require('../page/msite/msite')), 'msite')
/**
 * profile
 */
const profile = r =>
  require.ensure(
    [],
    () => r(require('../page/login/profile/profile')),
    'profile'
  )
/**
 * profile/info
 */
const info = r =>
  require.ensure(
    [],
    () => r(require('../page/login/profile/children/info')),
    'info'
  )
/**
 * profile/balance
 */
const balance = r =>
  require.ensure(
    [],
    () => r(require('../page/login/profile/children/balance')),
    'balance'
  )
/**
 * profile/balanceThat
 */
const balanceThat = r =>
  require.ensure(
    [],
    () => r(require('../page/login/profile/children/balanceThat')),
    'balanceThat'
  )
/**
 * profile/benefit
 */
const benefit = r =>
  require.ensure(
    [],
    () => r(require('../page/login/profile/children/benefit')),
    'benefit'
  )
/**
 * profile/enevlopeThat
 */
const enevlopeThat = r =>
  require.ensure(
    [],
    () => r(require('../page/login/profile/children/enevlopeThat')),
    'enevlopeThat'
  )
/**
 * profile/hbHistory
 */
const hbHistory = r =>
  require.ensure(
    [],
    () => r(require('../page/login/profile/children/hbHistory')),
    'hbHistory'
  )
/**
 * profile/points
 */
const points = r =>
  require.ensure(
    [],
    () => r(require('../page/login/profile/children/points')),
    'points'
  )
/**
 * profile/pointsThat
 */
const pointsThat = r =>
  require.ensure(
    [],
    () => r(require('../page/login/profile/children/pointsThat')),
    'pointsThat'
  )
/**
 * profile/volumeThat
 */
const volumeThat = r =>
  require.ensure(
    [],
    () => r(require('../page/login/profile/children/volumeThat')),
    'volumeThat'
  )
/**
 * profile/exchangeHb
 */
const exchangeHb = r =>
  require.ensure(
    [],
    () => r(require('../page/login/profile/children/exchangeHb')),
    'exchangeHb'
  )
/**
 * profile/commend
 */
const commend = r =>
  require.ensure(
    [],
    () => r(require('../page/login/profile/children/commend')),
    'commend'
  )
/**
 * address/newAddress
 */
const newAddress = r =>
  require.ensure(
    [],
    () => r(require('../page/login/address/newAddress')),
    'newAddress'
  )
/**
 * address/editAddress
 */
const editAddress = r =>
  require.ensure(
    [],
    () => r(require('../page/login/address/editAddress')),
    'editAddress'
  )
/**
 * address/editAddress
 */
const searchAddress = r =>
  require.ensure(
    [],
    () => r(require('../page/login/address/searchAddress')),
    'searchAddress'
  )
/**
 * order/order
 */
const order = r =>
  require.ensure([], () => r(require('../page/order/order')), 'order')
/**
 * search/search
 */
const search = r =>
  require.ensure([], () => r(require('../page/search/search')), 'search')
/**
 * profile/download
 */
const download = r =>
  require.ensure(
    [],
    () => r(require('../page/login/profile/download')),
    'download'
  )
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
    path: '/changeUserName',
    component: changeUserName,
    name: 'changeUserName'
  },
  {
    path: '/changePassWord',
    component: changePassWord,
    name: 'changePassWord'
  },
  {
    path: '/msite',
    component: msite,
    name: 'msite'
  },
  {
    path: '/profile',
    component: profile,
    name: 'profile',
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/info',
    component: info,
    name: 'info'
  },
  {
    path: '/balance',
    component: balance,
    name: 'balance'
  },
  {
    path: '/balanceThat',
    component: balanceThat,
    name: 'balanceThat'
  },
  {
    path: '/benefit',
    component: benefit,
    name: 'benefit',
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/enevlopeThat',
    component: enevlopeThat,
    name: 'enevlopeThat'
  },
  {
    path: '/volumeThat',
    component: volumeThat,
    name: 'volumeThat'
  },
  {
    path: '/hbHistory',
    component: hbHistory,
    name: 'hbHistory'
  },
  {
    path: '/points',
    component: points,
    name: 'points'
  },
  {
    path: '/pointsThat',
    component: pointsThat,
    name: 'pointsThat'
  },
  {
    path: '/newAddress',
    component: newAddress,
    name: 'newAddress'
  },
  {
    path: '/editAddress',
    component: editAddress,
    name: 'editAddress',
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/searchAddress',
    component: searchAddress,
    name: 'searchAddress'
  },
  {
    path: '/order',
    component: order,
    name: 'order'
  },
  {
    path: '/search',
    component: search,
    name: 'search'
  },
  {
    path: '/exchangeHb',
    component: exchangeHb,
    name: 'exchangeHb'
  },
  {
    path: '/commend',
    component: commend,
    name: 'commend'
  },
  {
    path: '/download',
    component: download,
    name: 'download'
  }
]
