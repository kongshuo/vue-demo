<template>
  <header id="head">
      <slot name="logo"></slot>
      <slot name="login"></slot>
      <a href="javascript:;" class="go-back" v-if="isGoBack" @click="$router.go(-1)">
        <i class="iconfont icon-fanhui"></i>
      </a>
      <section class="head-title" v-if="headTitle" @click="callback">
        <span class="ellipsis">{{headTitle}}</span>
      </section>
      <slot name="rightContent"></slot>
  </header>
</template>
<script>
export default {
  /**
   * props参数
   * isGoBack:boolean,是否显示返回标识
   * headTitle:string,头部显示标题
   */
  props: ['isGoBack', 'headTitle'],
  methods: {
    // 显示地址时，可以返回地址选择
    callback () {
      this.$emit('callback')
    }
  }
}
</script>
<style lang="scss" scoped>
#head{
  position: relative;
  top: 0;
  height: 90px;
  background-color: #3190e8;
}
.go-back{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display:block;
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  i{
    font-size: 32px;
    font-weight: bold;
    color: #fff;
  }
}
.head-title{
  height: 90px;
  padding:0 150px;
  span{
    display: block;
    height: 90px;
    line-height: 90px;
    font-size: 36px;
    font-weight: 600;
    color: #fff;
    text-align: center;
  }
}
</style>
