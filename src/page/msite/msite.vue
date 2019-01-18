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
              <router-link class="food-type" :to="{path:'/foodTypeList',query:{title:fooditem.title,geohash:geohash,restaurant_category_id:getRestaurantCategoryId(fooditem.link)}}" v-for="fooditem of item" :key="fooditem.id">
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
      <p class="product-title"><i class="iconfont icon-shop"></i>附近商家</p>
      <shop-list :geohash="geohash"></shop-list>
    </section>
    <foot-bottom></foot-bottom>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
import footBottom from '@/components/footer/footer'
import shopList from '@/components/common/shopList'
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
      swiperObj: {}
    }
  },
  computed: {
    ...mapState(['isLogin', 'setUserInfo', 'geohash'])
  },
  components: {
    headTop,
    footBottom,
    shopList
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
    getRestaurantCategoryId (linkPath) {
      if (linkPath) { // 由于数组中存在observer,导致传值第一个为undefind
        let getUrl = decodeURIComponent(linkPath.split('=')[1].replace('&target_name', '')) // 解码url,拆解,转换
        if (/restaurant_category_id/ig.test(getUrl)) {
          let restaurantCategoryId = JSON.parse(getUrl).restaurant_category_id.id
          return restaurantCategoryId
        } else {
          return ''
        }
      }
    }
  },
  created () {
    this.getNowAddress()
    this.getFoodTypes()
    this.getRestaurantCategoryId()
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
.product-title{
  height: 80px;
  line-height: 80px;
  margin-top: 20px;
  padding: 0 20px;
  border-top: 2px solid #e4e4e4;/*no*/
  font-size: 28px;
  color: #999;
  background: #fff;
  i{
    margin-right: 10px;
    font-size: 32px;
  }
}
</style>
