<template>
  <section class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <section class="timer">
      <p>支付剩余时间</p>
      <p>{{remaining}}</p>
    </section>
    <h4 class="pay-method">选择支付方式</h4>
    <ul class="select-method">
      <li :class="{active:isactive}" @click="selectMethod(1)">
        <img src="/static/img/zhifubao.png" alt="">
        <span>支付宝</span>
        <i class="iconfont icon-xuanze"></i>
      </li>
      <li :class="{active:!isactive}" @click="selectMethod(2)">
        <img src="/static/img/weixin.png" alt="">
        <span>微信</span>
        <i class="iconfont icon-xuanze"></i>
      </li>
    </ul>
    <button class="confirm-pay" @click="confirmPay">确认支付</button>
    <alert-tip :showAlertTip.sync="showAlertTip" :alertContent="alertContent" @callback="callback"></alert-tip>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
import alertTip from '@/components/common/alertTip'
import { setInterval, clearInterval } from 'timers'
export default {
  data () {
    return {
      headTitle: '在线支付',
      time: 900, // 默认支付时间15分钟
      isactive: true, // 默认选择支付宝
      method: 'zfb',
      showAlertTip: false,
      alertContent: ''
    }
  },
  computed: {
    remaining: function () {
      let minutes = parseInt(this.time / 60)
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      let seconds = parseInt(this.time % 60)
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      return '00 : ' + minutes + ' : ' + seconds
    }
  },
  components: {
    headTop,
    alertTip
  },
  methods: {
    // 选择支付方式
    selectMethod (num) {
      // 可根据此选择判断支付方式，跳转到对应支付接口
      if (num === 1) {
        this.isactive = true
        this.method = 'zfb'
      } else {
        this.isactive = false
        this.method = 'wx'
      }
    },
    // 确认支付
    confirmPay () {
      if (this.method === 'zfb') {
        this.showAlertTip = true
        this.alertContent = '您已选择支付宝支付'
      } else {
        this.showAlertTip = true
        this.alertContent = '您已选择微信支付'
      }
    },
    // 支付倒计时
    paytimer () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.time--
        if (this.time === 0) {
          clearInterval(this.timer)
          this.showAlertTip = true
          this.alertContent = '支付超时'
        }
      }, 1000)
    },
    callback () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.paytimer()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
.timer{
  height: 300px;
  background: #fff;
  p:nth-of-type(1){
    margin-top: 60px;
    text-align: center;
    font-size: 28px;
    color: #666;
  }
  p:nth-of-type(2){
    margin-top: 20px;
    text-align: center;
    font-size: 80px;
    color: #333;
  }
}
.pay-method{
  height: 90px;
  line-height: 90px;
  padding: 0 20px;
  font-size: 32px;
  color:#333;
}
.select-method{
  background: #fff;
  li{
    padding: 20px;
    height: 160px;
    line-height: 160px;
    border-bottom: 1px solid #f5f5f5;/*no*/
    img{
      width: 90px;
      margin:15px 10px;
    }
    span{
      display: inline-block;
      line-height: 120px;
      vertical-align: top;
      font-size: 32px;
      color: #333;
    }
    i{
      float: right;
      height: 120px;
      line-height: 120px;
      font-size: 60px;
      color: #ccc;
    }
  }
  .active{
    i{
      color: #4cd964;
    }
  }
}
.confirm-pay{
  width: 94%;
  margin: 40px 3%;
  height:90px;
  line-height: 90px;
  border-radius: 10px;
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  background: #4cd964;
}
</style>
