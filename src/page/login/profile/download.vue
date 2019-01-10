<template>
  <section class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <section class="download-content">
      <img src="/static/img/elmlogo.jpeg" alt="">
      <p>下载饿了么APP</p>
      <a href="javascript:;" @click="download">下载</a>
    </section>
    <alert-tip :showAlertTip.sync="showAlertTip" :alertContent="alertContent"></alert-tip>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
import alertTip from '@/components/common/alertTip'
export default {
  data () {
    return {
      headTitle: '下载',
      showAlertTip: false,
      alertContent: '请去软件商店下载正式App'
    }
  },
  components: {
    headTop,
    alertTip
  },
  methods: {
    download () {
      this.showAlertTip = true
    }
  }
}
</script>
<style lang="scss" scoped>
.download-content{
  padding: 50px 20px 0;
  text-align: center;
  img{
    width: 360px;
    border-radius:40px;
  }
  p{
    line-height: 80px;
    font-size: 36px;
    color: #666;
  }
  a{
    display: block;
    width: 100%;
    height: 80px;
    margin-top: 20px;
    border-radius: 10px;
    line-height: 80px;
    font-size: 32px;
    color: #fff;
    text-align: center;
    background: #4cd964;
  }
}
</style>
