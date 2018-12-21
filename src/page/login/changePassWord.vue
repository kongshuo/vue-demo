<template>
  <div class="login-box">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <form class="login-form" @submit.prevent>
      <section>
        <!-- .lazy表示不在是变化时触发，而在change时触发 -->
        <input type="text" placeholder="账号" v-model.lazy="userAccount"/>
      </section>
      <section>
        <input type="password" placeholder="原密码" v-model="oldPassWord">
      </section>
      <section>
        <input type="password" placeholder="请输入新密码" v-model="newPassWord">
      </section>
      <section>
        <input type="password" placeholder="请再次输入新密码" v-model="confirmPassWord">
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
      <div class="login-btn-box">
        <button class="login-btn" @click="confirmChange">确认修改</button>
      </div>
    </form>
    <alert-tip :showAlertTip.sync="showAlertTip" :alertContent="alertContent" @callback="callback"></alert-tip>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import alertTip from '@/components/common/alertTip'
import loginApi from '@/service/loginApi'
export default {
  data () {
    return {
      headTitle: '修改密码', // 头部标题
      userAccount: null, // 账号
      oldPassWord: null, // 原密码
      newPassWord: null, // 新密码
      confirmPassWord: null, // 确认密码
      codeNumber: null, // 验证码
      captchaCodeImg: null, // 验证码地址
      showAlertTip: false, // 控制提示弹出层显示
      alertContent: null // 提示内容
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
    // 确认修改
    confirmChange () {
      if (!this.userAccount) {
        this.showAlertTip = true
        this.alertContent = '账号不能为空'
        return false
      } else if (!this.oldPassWord) {
        this.showAlertTip = true
        this.alertContent = '请输入原密码'
        return false
      } else if (!this.newPassWord) {
        this.showAlertTip = true
        this.alertContent = '请输入新密码'
        return false
      } else if (!this.confirmPassWord) {
        this.showAlertTip = true
        this.alertContent = '请再次输入新密码'
        return false
      } else if (this.confirmPassWord !== this.newPassWord) {
        this.showAlertTip = true
        this.alertContent = '两次密码不一致，请重新输入'
        return false
      } else if (!this.codeNumber) {
        this.showAlertTip = true
        this.alertContent = '请输入验证码'
        return false
      }
      loginApi.changePassword({
        username: this.userAccount,
        oldpassWord: this.oldPassWord,
        newpassword: this.newPassWord,
        confirmpassword: this.confirmPassWord,
        captcha_code: this.codeNumber
      }).then(res => {
        if (res.data.message) {
          this.showAlertTip = true
          this.alertContent = res.data.message
          this.getImgCode()
        } else {
          this.showAlertTip = true
          this.alertContent = res.data.success
        }
      })
    },
    // 弹层确定回调
    callback () {
      this.$router.go(-1)
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
</style>
