<template>
  <section class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <section class="flex1">
      <img :src="imgBaseUrl + image_path" class="food_img">
      <p class="description">{{description}}</p>
      <section class="detail-container">
        <p class="name">{{name}}</p>
        <div class="rating_sale">
          <span>评分</span>
          <span>{{rating}}</span>
        </div>
        <p class="basep">
          <span>月售 {{month_sales}}单</span>
          <span>售价 ¥{{price}}</span>
          <span v-if="length">起</span>
        </p>
        <p class="basep">
          <span>评论数 {{rating_count}}</span>
          <span>好评率 {{satisfy_rate}}%</span>
        </p>
      </section>
    </section>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
import {getImgPath} from '@/config/mixins'
import {imgBaseUrl} from '@/config/env'
export default {
  data () {
    return {
      headTitle: '商品详情',
      image_path: null,
      description: null,
      month_sales: null,
      name: null,
      rating: 0,
      rating_count: null,
      satisfy_rate: null,
      foods: null,
      shopId: null,
      imgBaseUrl,
      price: null,
      length: null
    }
  },
  components: {
    headTop
  },
  mixins: [getImgPath],
  methods: {
    getFoodDetail () {

    }
  },
  created () {
    this.image_path = this.$route.query.image_path
    this.description = this.$route.query.description
    this.month_sales = this.$route.query.month_sales
    this.name = this.$route.query.name
    this.rating = this.$route.query.rating
    this.rating_count = this.$route.query.rating_count
    this.satisfy_rate = this.$route.query.satisfy_rate
    this.price = this.$route.query.price
    this.length = this.$route.query.length
    this.shopId = this.$route.query.shopId
  }
}
</script>
<style lang="scss" scoped>
.food_img{
  display: block;
  width: 100%;
}
.description{
  line-height: 40px;
  margin-top: 20px;
  padding: 0 20px;
  font-size: 28px;
  color: #666;
}
.detail-container{
  padding: 40px;
  .name{
    line-height: 60px;
    margin-bottom: 20px;
    font-size: 36px;
    font-weight: bold;
    color: #333;
  }
  .rating_sale{
    margin-bottom: 20px;
    span:nth-of-type(1){
      font-size: 28px;
      color: #666;
    }
    span:nth-of-type(2){
      font-size: 28px;
      color: #f60;
    }
  }
  .basep{
    span{
      margin-left: 10px;
      font-size: 28px;
      color: #f60;
    }
    span:nth-of-type(1){
      font-size: 28px;
      color: #666;
    }
  }
}
</style>
