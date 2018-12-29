<template>
  <div class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <div class="balance flex1">
      <div class="balance-content">
        <div class="content">
          <p class="balance-now">
            <span>当前积分</span>
            <router-link :to="{path:'/pointsThat'}" class="balanceThat">
              <img src="/static/img/description.png" alt="">
              <span>积分说明</span>
            </router-link>
          </p>
          <p class="count-num">
            <span>0</span>
            <span>分</span>
          </p>
          <button>积分兑换商品</button>
        </div>
      </div>
      <div class="balance-detail">
        <h4>最近30天积分记录</h4>
        <section class="trading-detail">
          <img src="/static/img/no-log.png" alt="">
          <p>最近30天无积分记录</p>
          <p>快去下单赚取大量积分吧</p>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
export default {
  data () {
    return {
      headTitle: '我的积分'
    }
  },
  components: {
    headTop
  }
}
</script>
<style lang="scss" scoped>
.balance-content{
  padding: 20px;
  background-color: #3190e8;
}
.content{
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  button{
    width: 100%;
    height: 80px;
    margin-top: 40px;
    border-radius: 10px;
    line-height: 80px;
    text-align: center;
    font-size: 32px;
    color: #fff;
    background: #fe6d47;
  }
}
.balance-now{
  line-height: 40px;
}
.balanceThat{
  float: right;
  line-height: 40px;
  img{
    width: 30px;
    height: 30px;
    margin:4px 5px 0 0;
  }
  span{
    font-size: 24px;
    color: #3190e8;
    vertical-align: top;
  }
}
.count-num{
  span:nth-of-type(1){
    font-size: 80px;
  }
}
.balance-detail{
  h4{
    padding-left:20px;
    line-height: 90px;
    font-size: 28px;
    color: #999;
  }
}
.trading-detail{
  margin-top: 80px;
  text-align: center;
  img{
    max-width: 500px;
  }
  p{
    margin-top: 20px;
    font-size: 32px;
    color: #666;
  }
}
</style>
