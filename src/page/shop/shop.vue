<template>
  <section class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <section class="top-introduce">
      <div class="shop-introduce">
        <img :src="imgBaseUrl + shopDetailMessage.image_path" alt="">
        <div>
          <p class="shop-name">{{shopDetailMessage.name}}</p>
          <p class="shop-mess">商家配送／{{shopDetailMessage.order_lead_time}}分钟送达／配送费¥{{shopDetailMessage.float_delivery_fee}}</p>
          <p class="shop-description">公告：{{shopDetailMessage.promotion_info||'欢迎光临，用餐高峰请提前下单，谢谢'}}</p>
        </div>
        <i class="iconfont icon-jinru"></i>
      </div>
      <div class="shop-activity clearfix">
        <div class="left ellipsis">
          <span>{{shopDetailMessage.activities[0].icon_name}}</span>
          <span>{{shopDetailMessage.activities[0].description}}（APP专享）</span>
        </div>
        <div class="right">{{shopDetailMessage.activities.length}}个活动<i class="iconfont icon-jinru"></i></div>
      </div>
    </section>
    <section class="tab-label">
      <div><a href="javascript:;" :class="{active:options==='1'}" @click="tab('1')">商品</a></div>
      <div><a href="javascript:;" :class="{active:options==='2'}" @click="tab('2')">评价</a></div>
    </section>
    <section class="goods">
      <buy-cart></buy-cart>
    </section>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
import buyCart from '@/components/common/buyCart'
import homeApi from '@/service/homeApi'
import {imgBaseUrl} from '@/config/env'
export default {
  data () {
    return {
      headTitle: '',
      shopid: null,
      latitude: null,
      longitude: null,
      imgBaseUrl,
      shopDetailMessage: { // 这么写为了不报错，接口格式有问题
        name: '',
        activities: [{icon_name: ''}]
      },
      options: '1'// 显示商品列表或者评价列表,默认显示商品列表
    }
  },
  components: {
    headTop,
    buyCart
  },
  methods: {
    // 获取url参数
    getUrlParams () {
      this.headTitle = this.$route.query.title
      this.shopid = this.$route.query.id
      this.latitude = this.$route.query.geohash.split(',')[0]
      this.longitude = this.$route.query.geohash.split(',')[1]
    },
    getShopDetailData () {
      let params = {shopid: this.shopid, latitude: this.latitude, longitude: this.longitude}
      homeApi.getShopDetail(params).then(res => {
        this.shopDetailMessage = Object.assign({}, this.shopDetailMessage, res.data)
      })
    },
    // tab切换
    tab (type) {
      this.options = type
    }
  },
  created () {
    this.getUrlParams()
    this.getShopDetailData()
  }
}
</script>
<style lang="scss" scoped>
.top-introduce{
  padding: 20px;
  background:rgba(119, 103, 137, 0.43);
}
.shop-introduce{
  position: relative;
  img{
    float:left;
    width: 130px;
    height: 130px;
  }
  div{
    padding:0 40px 0 150px;
  }
  i{
    position: absolute;
    top:50%;
    right: 10px;
    z-index: 1;
    transform: translateY(-50%);
    font-size: 32px;
    font-weight: bold;
    color: #f1f1f1;
  }
}
.shop-name{
  margin-bottom: 10px;
  line-height: 50px;
  font-size: 36px;
  font-weight: bold;
  color: #fff;
}
.shop-mess{
  margin-bottom: 10px;
  line-height: 40px;
  font-size: 28px;
  color: #fff;
}
.shop-description{
  line-height: 40px;
  font-size: 28px;
  color: #fff;
}
.shop-activity{
  margin-top: 10px;
  .left{
    width: 80%;
    span{
      color: #fff;
      font-size: 28px;
    }
    span:nth-of-type(1){
      padding: 5px;
      border-radius: 10px;
      background: rgb(240, 115, 115);
    }
  }
  .right{
    width: 20%;
    font-size: 28px;
    color: #fff;
    i{
      font-size: 28px;
      color: #fff;
    }
  }
}
.tab-label{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0 20px;
  height: 100px;
  div{
    flex:1;
    line-height: 70px;
    text-align: center;
    a{
      font-size: 36px;
      padding-bottom: 10px;
      border-bottom: 2px solid transparent;/*no*/
    }
    .active{
      color:#3190e8;
      border-color: #3190e8;
    }
  }
}
.goods{
  flex: 1;
  overflow: hidden;
  padding-bottom: 90px;
}
</style>
