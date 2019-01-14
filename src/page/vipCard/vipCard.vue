<template>
  <section class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <section class="flex1">
      <p class="buy-vip">账户<b>{{(setUserInfo.username)?(setUserInfo.username):'未登录'}}</b>购买会员</p>
      <section class="vip-tq">
         <h3 class="vip-title">会员特权<router-link class="vip-description" to="/vipDescription">会员说明<i class="iconfont icon-jinru"></i></router-link></h3>
         <ul>
           <li>
             <img src="/static/img/sheng.jpeg" alt="">
             <div>
               <h4>减免配送费</h4>
               <p>每月减免30单,每日可减免3单,每单最高减4元</p>
               <p>蜂鸟专送专享</p>
             </div>
           </li>
           <li>
             <img src="/static/img/jifen.jpeg" alt="">
             <div>
               <h4>减免配送费</h4>
               <p>每月减免30单,每日可减免3单,每单最高减4元</p>
               <p>蜂鸟专送专享</p>
             </div>
           </li>
         </ul>
      </section>
      <section class="open-vip">
        <h3 class="vip-title">开通会员</h3>
        <p>一个月<span>￥20</span><router-link to="/payment" class="buy-btn">购买</router-link></p>
      </section>
      <section class="bgfff-mt20">
        <h3 class="vip-title">兑换会员<router-link class="vip-description" to="/useCard">使用卡号卡密<i class="iconfont icon-jinru"></i></router-link></h3>
      </section>
      <section class="bgfff-mt20">
        <h3 class="vip-title">购买记录<router-link class="vip-description" to="/buyRecord">开发票<i class="iconfont icon-jinru"></i></router-link></h3>
      </section>
    </section>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      headTitle: '会员中心'
    }
  },
  computed: {
    ...mapState(['setUserInfo'])
  },
  components: {
    headTop
  }
}
</script>
<style lang="scss" scoped>
.buy-vip{
  height: 90px;
  line-height: 90px;
  padding: 0 20px;
  font-size: 28px;
  color: #666;
  b{
    margin: 0 5px;
    font-weight: bold;
    font-size: 30px;
    color: #333;
  }
}
.vip-title{
  height: 90px;
  line-height: 90px;
  padding: 0 20px;
  text-align:left;
  font-size: 32px;
  color: #333;
  .vip-description{
    float: right;
    font-size: 24px;
    color: #999;
  }
}
.vip-tq{
  background: #fff;
  li{
    padding:20px;
    img{
      float: left;
      width: 80px;
    }
    div{
      padding-left: 100px;
      h4{
        font-size: 32px;
        color: #333;
      }
      p{
        font-size: 24px;
        color: #999;
      }
    }
  }
}
.open-vip{
  background: #fff;
  margin-top: 20px;
  p{
    padding: 0 20px;
    height: 120px;
    line-height: 120px;
    font-size: 32px;
    color: #333;
    span{
      margin-left: 5px;
      font-size: 36px;
      font-weight: bold;
      color: #f60;
    }
    .buy-btn{
      float: right;
      width: 120px;
      height: 60px;
      line-height: 58px;
      margin-top: 30px;
      border: 1px solid #f60;/*no*/
      border-radius: 10px;
      font-size: 28px;
      color: #f60;
      text-align: center;
    }
  }
}
.bgfff-mt20{
  margin-top: 20px;
  background: #fff;
}
</style>
