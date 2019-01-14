<template>
  <section class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <section class="flex1">
      <p class="tip">成功兑换后将关联到当前账号:<span>{{setUserInfo.username}}</span></p>
      <div class="code-box">
        <input type="text" placeholder="请输入10位卡号" maxlength="10" v-model="card" @input="changeBtnStatus"/>
        <input type="text" placeholder="请输入6位卡密" maxlength="6" v-model="cardpassword" @input="changeBtnStatus"/>
      </div>
      <div class="exchange-box">
        <button :class="{active:isactive}" :disabled="!isactive" @click="exchange">兑换</button>
      </div>
    </section>
    <alert-tip :showAlertTip.sync="showAlertTip" :alertContent="alertContent"></alert-tip>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
import alertTip from '@/components/common/alertTip'
import homeApi from '@/service/homeApi'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      headTitle: '兑换会员',
      isactive: false,
      card: '', // 卡号
      cardpassword: '', // 卡密
      showAlertTip: false,
      alertContent: ''
    }
  },
  computed: {
    ...mapState(['setUserInfo'])
  },
  components: {
    headTop,
    alertTip
  },
  methods: {
    exchange () {
      let params = {id: this.setUserInfo.user_id, number: this.card, password: this.cardpassword}
      homeApi.exchangeVipCard(params).then(res => {
        this.showAlertTip = true
        this.alertContent = res.data.message
      })
    },
    changeBtnStatus () {
      if (this.card.split('').length === 10 && this.cardpassword.split('').length === 6) {
        this.isactive = true
      } else {
        this.isactive = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tip{
  height: 90px;
  line-height: 90px;
  padding: 0 20px;
  font-size: 28px;
  color: #666;
  span{
    margin-left: 10px;
    font-size: 28px;
    color: #333;
    font-weight: bold;
  }
}
.code-box{
  background: #fff;
  input{
    width: 100%;
    height: 90px;
    line-height: 90px;
    padding-left: 20px;
    font-size: 28px;
    color: #666;
  }
  input:first-child{
    border-bottom: 1px solid #f5f5f5;/*no*/
  }
}
.exchange-box{
  padding: 20px;
  button{
    width: 100%;
    height: 80px;
    line-height: 80px;
    border-radius: 10px;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    color: #fff;
    background: #ccc;
  }
  .active{
    background: #4cd964;
  }
}
</style>
