// 路由的懒加载
const home = r =>
  require.ensure([], () => r(require('../page/home/home')), 'home')
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
  }
]
