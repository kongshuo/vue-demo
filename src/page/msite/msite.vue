<template>
  <section class="app">
    <head-top :isSearch="true" :headTitle="headTitle" @callback="callback">
      <a href="javascript:;" slot="login" class="login right" @click="login" v-if="!isLogin">登录|注册</a>
      <a href="javascript:;" slot="login" class="login right" v-if="isLogin" @click="toProfile">
        <i class="iconfont icon-yonghu" style="color:#fff;font-size:18px;font-weight:bold;"></i>
      </a>
    </head-top>
    <section class="flex1">
      <div class="swiper-container" v-if="foodTypes.length > 0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) of foodTypes" :key="index">
            <nav class="nav">
              <router-link class="food-type" to="/msite" v-for="fooditem of item" :key="fooditem.id">
                <figure>
                  <img :src="imgBaseUrl +fooditem.image_url" :alt="fooditem.description">
                  <figcaption>{{fooditem.title}}</figcaption>
                </figure>
              </router-link>
            </nav>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="product-list">
        <p class="product-title"><i class="iconfont icon-shop"></i>附近商家</p>
        <ul>
          <li v-for="item of shopList" :key="item.id">
            <img :src="baseUrl + item.image_path" alt="">
            <section class="product-content">
              <h3>
                <span v-if="item.is_premium" class="shoptype">品牌</span>
                <span class="shopname">{{item.name}}</span>
                <span class="shopservice">
                  <i v-for="(support,index) of item.supports" :key="index">{{support.icon_name}}</i>
                </span>
              </h3>
              <section class="evaluate">
                <span>评分:{{item.rating}}</span>
                <span>月售{{item.recent_order_num}}单</span>
                <span class="right supports" v-if="zhunshi(item.supports)">准时达</span>
                <span class="right delivery" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
              </section>
              <section class="shipping-information">
                <span>¥{{item.float_minimum_order_amount + '起送/'}}{{item.piecewise_agent_fee.tips}}</span>
                <span class="right">{{item.distance}}/<i>{{item.order_lead_time}}</i></span>
              </section>
            </section>
          </li>
        </ul>
      </div>
    </section>
    <foot-bottom></foot-bottom>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
import footBottom from '@/components/footer/footer'
import {imgBaseUrl} from '@/config/env'
import Swiper from 'swiper'
import homeApi from '@/service/homeApi'
import {mapState} from 'vuex'
import 'swiper/dist/css/swiper.min.css'
export default {
  data () {
    return {
      headTitle: '',
      foodTypes: [], // 食品分类列表，二维数组
      imgBaseUrl: 'https://fuss10.elemecdn.com',
      swiperObj: {},
      shopList: [], // 附近商家列表
      baseUrl: imgBaseUrl // 公共路径
    }
  },
  computed: {
    ...mapState(['isLogin', 'setUserInfo', 'geohash'])
  },
  components: {
    headTop,
    footBottom
  },
  methods: {
    login () {
      this.$router.push({path: '/login'})
    },
    toProfile () {
      this.$router.push({path: '/profile'})
    },
    callback () {
      this.$router.push({path: '/home'})
    },
    getNowAddress () {
      let params = {geohash: this.$route.query.geohash}
      homeApi.getGeohashAddress(params).then(res => {
        this.headTitle = res.data.name
      })
    },
    getFoodTypes () {
      let params = {geohash: this.$route.query.geohash}
      homeApi.getFoodTypes(params).then(res => {
        /** 将数据进行分割成一个二维数组,每个子数组中最多有8条数据 */
        let resArr = [...res.data]
        let resLength = resArr.length
        let foodArr = []
        for (var i = 0, j = 0; i < resLength; i += 8, j++) { // 此处避免使用resArr.length,splice()方法会改变原数组
          foodArr[j] = resArr.splice(0, 8)
        }
        this.foodTypes = foodArr
      }).then(() => {
        this.swiperObj = new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination',
            renderBullet: function (index, className) {
              return '<span class="' + className + '" style="width:10px;height:10px;margin:0 5px;"></span>'
            }
          },
          loop: true
        })
      })
    },
    getShopList () {
      let latitude = this.$route.query.geohash.split(',')[0]
      let longitude = this.$route.query.geohash.split(',')[1]
      let params = {
        latitude: latitude,
        longitude: longitude,
        offset: 0,
        restaurant_category_id: '',
        restaurant_category_ids: '',
        order_by: '',
        delivery_mode: '',
        support_ids: []
      }
      homeApi.getShopList(params).then(res => {
        this.shopList = [...res.data]
      })
    },
    zhunshi (supports) {
      let zhunStatus
      if ((supports instanceof Array) && supports.length > 0) {
        supports.forEach(item => {
          if (item.icon_name === '准') {
            zhunStatus = true
          }
        })
      } else {
        zhunStatus = false
      }
      return zhunStatus
    }
  },
  created () {
    this.getNowAddress()
    this.getFoodTypes()
    this.getShopList()
  }
}
</script>
<style lang="scss" scoped>
.login{
  display: inline-block;
  height: 100%;
  padding: 0 20px;
  line-height: 90px;
  font-size: 28px;
  color: #fff;
}
.nav{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content: space-between;
  .food-type{
    width: 25%;
    padding: 20px 0;
    text-align: center;
    figcaption{
      font-size: 32px;
      color: #666;
    }
    img{
      width: 90px;
    }
  }
}
.swiper-container{
  width: 100%;
  height: 400px;
  border-bottom: 2px solid #e4e4e4;/*no*/
  background: #fff;
}
.product-list{
  padding: 0 20px;
  margin-top: 20px;
  border-top: 2px solid #e4e4e4;/*no*/
  background: #fff;
  li{
    padding: 30px 0;
    border-bottom: 1px solid #f1f1f1;/*no*/
    img{
      float: left;
      width: 120px;
    }
  }
}
.product-content{
  padding-left: 130px;
  h3{
    .shoptype{
      display: inline-block;
      padding: 4px;
      margin-right: 10px;
      border-radius: 10px;
      color: #333;
      font-size: 28px;
      background: #ffd930;
    }
    .shopname{
      font-size: 36px;
      font-weight: bold;
      color: #333;
    }
    .shopservice{
      float: right;
      i{
        margin: 0 4px;
        font-size: 24px;
        color: #999;
      }
    }
  }
  p:nth-of-type(1){
    padding: 10px;
  }
  p:nth-of-type(2){
    padding: 100px;
  }
}
.product-title{
  height: 80px;
  line-height: 80px;
  font-size: 28px;
  color: #999;
  i{
    margin-right: 10px;
    font-size: 32px;
  }
}
.evaluate{
  line-height: 60px;
  span:nth-of-type(1){
    margin-right: 10px;
    font-size: 28px;
    color:#ff6000;
  }
  span:nth-of-type(2){
    margin-right: 10px;
    font-size: 24px;
    color:#999;
  }
  .supports{
    font-size: 24px;
    color: #3190e8;
    padding: 0 4px;
    margin-top:13px;
    margin-left: 10px;
    height: 36px;
    line-height: 34px;
    border: 1px solid #3190e8;/*no*/
    border-radius: 5px;
  }
  .delivery{
    font-size: 24px;
    color: #fff;
    padding: 0 4px;
    margin-top:13px;
    margin-left: 10px;
    height: 36px;
    line-height: 34px;
    border-radius: 5px;
    background: #3190e8;
  }
}
.shipping-information{
  line-height: 60px;
  span:nth-of-type(1){
    font-size: 24px;
    color: #666;
  }
  span:nth-of-type(2){
    font-size: 24px;
    color: #999;
    i{
      color: #3190e8;
    }
  }
}
</style>
