const HelloWorld = conp =>
  require.ensure([], () => conp(require('../components/HelloWorld')), 'home')
// 在此抛出一个routes配置,是一个数组
export default [
  {
    path: '/',
    component: HelloWorld,
    children: [
      {
        path: '',
        redirect: '/HelloWorld',
        name: 'HelloWorld'
      },
      {
        path: '/HelloWorld',
        component: HelloWorld,
        name: 'HelloWorld'
      }
    ]
  }
]
