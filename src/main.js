// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import routes from './router/index'
import 'lib-flexible'
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false
Vue.use(Router)
const router = new Router({
  routes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App }, // 默认载入组件,index.html的引用组件
  template: '<App/>' // 实例的模板<app></app>
})
