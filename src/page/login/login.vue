<template>
  <div class="login-box">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <form class="login-form" @submit.prevent>
      <section>
        <!-- .lazy表示不在是变化时触发，而在change时触发 -->
        <input type="text" placeholder="账号" v-model.lazy="userAccount"/>
      </section>
      <section :class="{showPassWord:showPassWord,hidePassWord:!showPassWord}">
        <input v-if="!showPassWord" type="password" placeholder="密码" v-model="passWord">
        <input v-else type="text" placeholder="密码" v-model="passWord">
        <div class="password">
          <span>隐藏</span>
          <span>显示</span>
          <button @click="tabShowPassWord"></button>
        </div>
      </section>
      <section>
        <input type="text" placeholder="验证码" v-model.number="codeNumber" maxlength="4"/>
        <div class="codeNumber-img">
          <img :src="captchaCodeImg" alt="">
          <a href="javascript:;" @click="getImgCode">
            <span>看不清</span>
            <span>换一张</span>
          </a>
        </div>
      </section>
      <p class="tips">温馨提示：未注册过的账号，登录时将自动注册</p>
      <p class="tips">注册过的用户可凭账号密码登录</p>
      <div class="login-btn-box">
        <button class="login-btn" @click="login">登  录</button>
      </div>
    </form>
    <router-link to="./changePassWord" class="changePassWord">修改密码?</router-link>
    <alert-tip :showAlertTip.sync="showAlertTip" :alertContent="alertContent"></alert-tip>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import alertTip from '@/components/common/alertTip'
import loginApi from '@/service/loginApi'
export default {
  data () {
    return {
      headTitle: '密码登录', // 头部标题
      userAccount: null, // 账号
      passWord: null, // 密码
      codeNumber: null, // 验证码
      showPassWord: false, // 是否显示密码,默认不显示
      captchaCodeImg: null, // 验证码地址
      showAlertTip: false, // 控制提示弹出层显示
      alertContent: null, // 提示内容
      userInfo: null
    }
  },
  components: {
    headTop,
    alertTip
  },
  methods: {
    // 图片验证码接口请求
    getImgCode () {
      loginApi.getCaptchas().then((res) => {
        this.captchaCodeImg = res.data.code
      })
    },
    // 切换密码显示状态
    tabShowPassWord () {
      this.showPassWord = !this.showPassWord
    },
    // 登录
    login () {
      if (!this.userAccount) {
        this.alertContent = '账号不能为空！'
        this.showAlertTip = true
        return false
      } else if (!this.passWord) {
        this.alertContent = '密码不能为空！'
        this.showAlertTip = true
        return false
      } else if (!this.codeNumber) {
        this.alertContent = '验证码不能为空！'
        this.showAlertTip = true
        return false
      }
      loginApi.accountLogin(this.userAccount, this.passWord, this.codeNumber).then(res => {
        let userId = res.data.user_id
        this.userInfo = res.data
        if (!userId) {
          this.showAlertTip = true
          // 当密码错误时，清空密码和刷新验证码重新输入
          if (res.data.type === 'ERROR_PASSWORD') {
            this.alertContent = res.data.message
            this.passWord = null
            this.codeNumber = null
            this.getImgCode()
            return false
            // 当验证码错误时，刷新验证码重新输入
          } else if (res.data.type === 'ERROR_CAPTCHA') {
            this.alertContent = res.data.message
            this.codeNumber = null
            this.getImgCode()
            return false
          }
        } else {
          this.$store.dispatch('setUserInfo', this.userInfo)
          this.$router.go(-1)
        }
      })
    }
  },
  created () {
    this.getImgCode()
  }
}
</script>
<style lang="scss" scoped>
.login-form{
  margin-top: 20px;
  background: #fff;
  input{
    font-size: 32px;
    color: #666;
    border: 0;
    outline: none;
  }
  section{
    position: relative;
    padding: 40px;
    border-bottom: 2px solid #e4e4e4;
    .password{
      height: 40px;
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translateY(-20px);
      border-radius: 20px;
      background:#ccc;
      font-size: 0;
      span{
          display: inline-block;
          width: 60px;
          height: 40px;
          padding:0 5px;
          line-height: 40px;
          vertical-align: middle;
          font-size: 20px;
          color: #fff;
      }
      button{
        position: absolute;
        left: 0;
        top:-2px;
        width: 60px;
        height: 44px;
        border-radius: 100%;
        background:#3190e8;
        outline: none;
        transition: all .3s;
      }
    }
  }
  .hidePassWord{
    .password{
      button{
        transform: translateX(60px)
      }
    }
  }
  .showPassWord{
    .password{
      background-color: #4cd964;
    }

  }
}
.codeNumber-img{
  position: absolute;
  right: 20px;
  top: 50%;
  margin-top:-30px;
  z-index: 10;
  a{
    display: inline-block;
    width: 100px;
    span{
      display: block;
      text-align: center;
    }
  }
}
.tips{
  padding: 10px 40px;
  color: red;
}
.login-btn-box{
  padding: 20px 40px;
}
.login-btn{
  width: 100%;
  height: 90px;
  line-height: 90px;
  border: none;
  border-radius: 5px;
  background-color: #4cd964;
  font-size: 36px;
  color: #fff;
  font-weight: bold;
}
.changePassWord{
  float: right;
  font-size: 28px;
  color: #3b95e9;
  margin: 20px 40px 0 0;
}
</style>
