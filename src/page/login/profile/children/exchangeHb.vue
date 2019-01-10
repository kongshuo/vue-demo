<template>
  <div class="app">
    <header-top :isGoBack="true" :headTitle="headTitle"></header-top>
    <section class="flex1">
      <form @submit.prevent>
        <section class="exchange-code">
          <input type="text" placeholder="请输入兑换码" v-model.number="exchangeCode" ref="exchangeCode" @input="changeBtn"/>
        </section>
        <section class="verification-code">
          <input type="text" placeholder="验证码" maxlength="4" v-model.number="verifiteCode" ref="verifiteCode" @input="changeBtn"/>
          <div class="change-code">
            <div class="flex1">
              <img :src="imgCodeUrl" alt="" >
            </div>
            <a href="javascript:;" @click="getCode">
              <span>看不清</span>
              <span>换一张</span>
            </a>
          </div>
        </section>
        <button class="exchange-btn" :class="{active:isClick}" :disabled="!isClick" @click="exchange">兑换</button>
      </form>
    </section>
    <alert-tip :showAlertTip.sync="showAlertTip" :alertContent="alertContent"></alert-tip>
  </div>
</template>
<script>
import headerTop from '@/components/header/header'
import alertTip from '@/components/common/alertTip'
import loginApi from '@/service/loginApi'
import homeApi from '@/service/homeApi'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      headTitle: '兑换红包',
      exchangeCode: '', // 兑换码
      verifiteCode: '', // 验证码
      alertContent: '', // 弹窗提示语
      showAlertTip: false, // 弹窗提示开关
      isClick: false, // 兑换按钮是否可点击
      imgCodeUrl: ''
    }
  },
  computed: mapState(['setUserInfo']),
  components: {
    headerTop,
    alertTip
  },
  methods: {
    // 改变兑换按钮的状态
    changeBtn () {
      let verifiteCodeLength = this.$refs.verifiteCode.value.split('').length
      if (this.$refs.exchangeCode.value && this.$refs.verifiteCode.value && verifiteCodeLength === 4) {
        this.isClick = true
      } else {
        this.isClick = false
      }
    },
    // 兑换
    exchange () {
      if (this.setUserInfo.user_id) {
        let params = {
          id: this.setUserInfo.user_id,
          exchangeCode: this.exchangeCode,
          captchaCode: this.verifiteCode
        }
        homeApi.exchangeHb(params).then(res => {
          this.showAlertTip = true
          this.alertContent = res.data.message
        })
      } else {
        this.showAlertTip = true
        this.alertContent = '请先去登录'
      }
      let params = {}
      homeApi.exchangeHb(params)
    },
    // 获取验证码
    getCode () {
      loginApi.getCaptchas().then(res => {
        this.imgCodeUrl = res.data.code
      })
    }
  },
  created () {
    this.getCode()
  }
}
</script>
<style lang="scss" scoped>
form{
  padding: 0 20px;
}
.exchange-code{
  margin-top: 20px;
  input{
    width: 100%;
    padding: 20px 0 20px 10px;
    height: 100px;
    line-height: 60px;
    border:0;
    border-radius: 10px;
    background: #fff;
    font-size: 28px;
    color: #666;
    outline: 0;
  }
}
.verification-code{
  position: relative;
  padding-right: 300px;
  margin-top: 20px;
  input{
    width: 100%;
    padding: 20px 0 20px 10px;
    height: 100px;
    line-height: 60px;
    border:0;
    border-radius: 10px;
    background: #fff;
    font-size: 28px;
    color: #666;
    outline: 0;
  }
  .change-code{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 9;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 280px;
    height: 100px;
    border-radius: 10px;
    background: #fff;
    div{
      line-height: 100px;
      text-align: center;
      img{
        max-width: 100%;
        margin-top: 20px;
      }
    }
    a{
      display: block;
      width: 80px;
      span{
        display: block;
        line-height: 50px;
        font-size: 20px;
      }
      span:nth-of-type(1){
        color: #666;
      }
      span:nth-of-type(2){
        color: #3b95e9;
      }
    }
  }
}
.exchange-btn{
  width: 100%;
  height: 80px;
  line-height: 80px;
  margin-top: 20px;
  border-radius: 10px;
  font-size: 28px;
  text-align: center;
  color: #fff;
  background: #ccc;
}
.exchange-btn.active{
  background: #4cd964;
}
</style>
