<template>
  <div class="info-box app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <div class="flex1">
      <div class="userImg-upload">
        <span class="small-title">头像</span>
        <img src="@/assets/default.jpg" alt="">
        <i class="iconfont icon-jinru"></i>
      </div>
      <div class="small-module">
        <ul>
          <li>
            <span class="small-title">用户名</span>
            <span class="right-span">kong0304</span>
            <i class="iconfont icon-jinru"></i>
          </li>
          <li>
            <span class="small-title">收货地址</span>
            <i class="iconfont icon-jinru"></i>
          </li>
        </ul>
        <h4>账号绑定</h4>
        <ul>
          <li>
            <span class="small-title">手机</span>
            <i class="iconfont icon-jinru"></i>
          </li>
        </ul>
        <h4>安全设置</h4>
        <ul>
          <li>
            <span class="small-title">登录密码</span>
            <span class="right-span">修改</span>
            <i class="iconfont icon-jinru"></i>
          </li>
        </ul>
        <div class="sign-up">
          <button>退出登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
export default {
  data () {
    return {
      headTitle: '账户信息'
    }
  },
  components: {
    headTop
  }
}
</script>

<style lang="scss" scoped>
.userImg-upload{
  padding: 40px 20px;
  margin-top: 20px;
  border-top: 2px solid #ddd;/*no*/
  background-color: #fff;
  text-align: right;
  img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}
.icon-jinru{
  float: right;
  font-size: 32px;
  color: #999;
  margin:26px 0 20px 20px;
}
.small-title{
  float: left;
  height: 80px;
  line-height: 80px;
  font-size: 28px;
  color: #333;
  font-weight: bold;
}
.small-module{
  ul{
    background: #fff;
  }
  li{
    height: 120px;
    padding: 20px;
    border-top: 1px solid #ddd;/*no*/
    text-align: right;
    .right-span{
      height: 80px;
      line-height: 80px;
      font-size: 32px;
      color: #999;
      font-weight: 600;
    }
  }
  h4{
    padding: 20px;
    font-size: 24px;
    color: #666;
  }
}
.sign-up{
  padding: 0 20px;
  margin-top: 100px;
  button{
    width: 100%;
    height: 80px;
    line-height: 80px;
    border-radius: 10px;
    font-size: 28px;
    color: #fff;
    text-align: center;
    background-color: #d8584a;
  }
}
</style>
