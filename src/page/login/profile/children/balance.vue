<template>
  <div class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <div class="balance flex1">
      <div class="balance-content">
        <div class="content">
          <p class="balance-now">
            <span>当前余额</span>
            <router-link :to="{path:'/balanceThat'}" class="balanceThat">
              <img src="/static/img/description.png" alt="">
              <span>余额说明</span>
            </router-link>
          </p>
          <p class="count-num">
            <span>0.00</span>
            <span>元</span>
          </p>
          <button>提  现</button>
        </div>
      </div>
      <div class="balance-detail">
        <h4>交易明细</h4>
        <section class="trading-detail">
          <img src="/static/img/no-log.png" alt="">
          <p>暂无交易记录</p>
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
      headTitle: '我的余额'
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
    background: #ccc;
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
