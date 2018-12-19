<template>
  <div id="app">
    <transition name="fade-in" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade-in" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './style/common.scss';
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fade-in-enter-active,.fade-in-leave-active{
  transition: opacity .5s;
}
.fade-in-enter,.fade-in-leave-to{
  opacity: 0;
}
/*全局定义class,使用flex布局使头部固定在顶部*/
.app{
    display: flex;
    flex-direction: column;
    height: 100%;
}
.flex1{
  flex:1;
  overflow-y: auto;
}
</style>
