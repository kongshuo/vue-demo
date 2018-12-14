<template>
  <div class="location">
    <head-top>
      <a href="javascript:;" slot="logo" class="logo left">ele.me</a>
      <a href="javascript:;" slot="login" class="login right">登录|注册</a>
    </head-top>
    <section class="location-content">
      <div class="now-city">
        <p>
          <span class="left">当前定位城市:</span>
          <span class="right">定位不准时,请在城市列表中选择</span>
        </p>
        <a href="javascript:;">
          <span>{{cityGuess}}</span>
          <i class="right iconfont icon-jinru"></i>
        </a>
      </div>
      <div class="hot-city">
        <h3 class="hot-city-title">热门城市</h3>
        <ul>
          <li>北京</li>
          <li>北京</li>
           <li>北京</li> <li>北京</li> <li>北京</li> <li>北京</li> <li>北京</li> <li>北京</li>
        </ul>
      </div>
      <div class="city-list"></div>
    </section>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import api from '@/service/getData'
export default {
  data () {
    return {
      cityGuess: ''// 默认地址
    }
  },
  components: {
    headTop
  },
  created () {
    api.cityGuess()
  }
}
</script>

<style lang="scss" scoped>
.location{
  .logo,.login{
    display: inline-block;
    height: 100%;
    line-height: 90px;
    font-size: 28px;
    color: #fff;
  }
}
.now-city{
  margin-top: 20px;
  p{
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    span:nth-of-type(1){
      font-size: 28px;
      color: #666;
    }
    span:nth-of-type(2){
      font-size: 20px;
      color: #9f9f9f;
      font-weight: bold;
    }
  }
  a{
    display: block;
    height: 83px;
    line-height: 80px;
    padding: 0 20px;
    border-top: 1px solid #e4e4e4;/*no*/
    border-bottom: 2px solid #e4e4e4;/*no*/
    span{
      font-size: 32px;
      font-weight: bold;
      color: #3190e8;
    }
    i{
      font-size: 26px;
      font-weight: bold;
      color: #999;
    }
  }
}
.hot-city{
  margin-top: 20px;
  border-top: 2px solid #e4e4e4;/*no*/
  border-bottom: 1px solid #e4e4e4;/*no*/
  .hot-city-title{
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    font-size: 26px;
    color: #666;
  }
  li{
    float: left;
    width: 25%;
    height: 80px;
    line-height: 80px;
    border-right: 1px solid #e4e4e4;/*no*/
    border-bottom: 1px solid #e4e4e4;/*no*/
    text-align: center;
    font-size:30px;
    color: #3190e8;
  }
}
</style>
