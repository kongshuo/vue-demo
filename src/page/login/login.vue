<template>
  <div class="login-box">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
export default {
  data () {
    return {
      headTitle: '密码登录' // 头部标题
    }
  },
  components: {
    headTop
  }
}
</script>
<style lang="sass" scoped>

</style>
