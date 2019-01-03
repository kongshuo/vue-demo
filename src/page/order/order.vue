<template>
  <div class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <div class="flex1"></div>
    <foot-bottom></foot-bottom>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import footBottom from '@/components/footer/footer'
export default {
  data () {
    return {
      headTitle: '我的订单'
    }
  },
  components: {
    headTop,
    footBottom
  }
}
</script>
<style lang="scss" scoped>

</style>
