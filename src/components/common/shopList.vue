<template>
  <div class="product-list">
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
</template>
<script>
import {imgBaseUrl} from '@/config/env'
import homeApi from '@/service/homeApi'
export default {
  data () {
    return {
      headTitle: '',
      foodTypes: [], // 食品分类列表，二维数组
      shopList: [], // 商家列表
      baseUrl: imgBaseUrl // 公共路径
    }
  },
  /**
   *  geohash:当前定位的经纬度
   *  sortType：排序方式，number类型
   *  deliveryMode:已经选择的配送方式, 未选择未null
   *  chooseStatus:判断筛选中的确定按钮是否被点击
   *  supportIds:商家已选的属性的id列表
   */
  props: ['geohash', 'sortType', 'deliveryMode', 'chooseStatus', 'supportIds'],
  watch: {
    // 监听排序方式
    sortType: function (newVal) {
      this.getShopList()
    },
    // 监听筛选中的确定按钮
    chooseStatus: function (newVal) {
      this.getShopList()
    }
  },
  methods: {
    getShopList () {
      let latitude = this.geohash.split(',')[0]
      let longitude = this.geohash.split(',')[1]
      let params = {
        latitude: latitude,
        longitude: longitude,
        offset: 0,
        restaurant_category_id: '',
        restaurant_category_ids: '',
        order_by: this.sortType ? this.sortType : '',
        delivery_mode: this.deliveryMode,
        support_ids: this.supportIds ? this.supportIds : []
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
  mounted () {
    this.getShopList()
  }
}
</script>
<style lang="scss" scoped>
.product-list{
  padding: 0 20px;
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
