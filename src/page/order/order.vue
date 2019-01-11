<template>
  <div class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <div class="flex1"></div>
    <foot-bottom></foot-bottom>
    <img-loading></img-loading>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import footBottom from '@/components/footer/footer'
import imgLoading from '@/components/common/imgLoading'
export default {
  data () {
    return {
      headTitle: '我的订单'
    }
  },
  components: {
    headTop,
    footBottom,
    imgLoading
  }
}
</script>
<style lang="scss" scoped>

</style>
