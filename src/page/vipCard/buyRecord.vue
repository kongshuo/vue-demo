<template>
  <section class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <section class="flex1">
      <!-- 由于没有成功办理过会员所以没有记录,写死 -->
      <section class="invoice_contianer">
        <img src="/static/img/no-log.png">
        <p>没有购买记录</p>
      </section>
    </section>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
export default {
  data () {
    return {
      headTitle: '购买记录'
    }
  },
  components: {
    headTop
  }
}
</script>
<style lang="scss" scoped>
.invoice_contianer{
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
          width: 360px;
          margin-top:200px;
      }
      p{
        line-height: 100px;
        text-align: center;
        font-size: 28px;
        color: #999;
      }
  }
</style>
