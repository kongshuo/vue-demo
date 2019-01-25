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
      <div class="left-nav" ref="left">
        <ul>
          <li v-for="(item,index) of foodList" :key="item.id" :class="{active:index===currentIndex}" @click="navTab(index,$event)">
            <img :src="getImgPath(item.icon_url)" alt="">
            <span>{{item.name}}</span>
            <b v-if="item.categoryNum">{{item.categoryNum}}</b>
          </li>
        </ul>
      </div>
      <div class="right-list" ref="right">
        <ul>
          <li v-for="(item,index) of foodList" :key="index" class="right-item">
            <h3>
              {{item.name}}
              <span>{{item.description}}</span>
            </h3>
            <section class="typefood-list">
              <ul>
                <li v-for="(val,order) of item.foods" :key="order">
                  <div class="img-left-box">
                    <img :src="imgBaseUrl + val.image_path" alt="">
                  </div>
                  <div class="food-detail">
                    <h4 class="ellipsis"><span>{{val.name}}</span></h4>
                    <p class="food-introdeuce">{{val.description}}</p>
                    <p class="describe">
                      <span>月售{{val.month_sales}}份</span>
                      <span>好评率{{val.satisfy_rate}}%</span>
                    </p>
                    <div class="price-box">
                      <div class="one-price">￥{{val.specfoods[0].price}}</div>
                      <div class="change-count">
                          <i class="iconfont icon-jian" @click="reduce(item.id,val.item_id,val.specfoods[0].price)" v-if="val.foodNum"></i>
                          <span>{{val.foodNum ? val.foodNum : ''}}</span>
                          <i class="iconfont icon-jia" @click="increase(item.id,val.item_id,val.specfoods[0].price)"></i>
                      </div>
                    </div>
                  </div>
                  <div class="foodlabelbox" v-if="val.attributes.length > 0" >
                    <span v-for="(attribute,attrIndex) of val.attributes" :key="attrIndex" :class="{foodlabel:attribute.icon_name === '新',foodlabel2:attribute.icon_name === '招牌'}">
                      <i>{{attribute.icon_name === '新'? '新品':attribute.icon_name}}</i>
                    </span>
                  </div>
                </li>
              </ul>
            </section>
          </li>
        </ul>
      </div>
      <buy-cart :buyCartNum.sync="buyCartNum" :buyCartPrice.sync="buyCartPrice" :deliveryFee="deliveryFee" :minimumOrderAmount="minimumOrderAmount" @reduce="reduce" @increase="increase"></buy-cart>
    </section>
    <img-loading :isLoading="isLoading"></img-loading>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
import buyCart from '@/components/common/buyCart'
import imgLoading from '@/components/common/imgLoading'
import homeApi from '@/service/homeApi'
import {imgBaseUrl} from '@/config/env'
import {getImgPath} from '@/config/mixins'
import {mapMutations} from 'vuex'
import Bscroll from 'better-scroll'
export default {
  data () {
    return {
      headTitle: '',
      shopid: null,
      latitude: null,
      longitude: null,
      isLoading: true,
      imgBaseUrl,
      shopDetailMessage: { // 这么写为了不报错，接口格式有问题
        name: '',
        activities: [{icon_name: ''}]
      },
      options: '1', // 显示商品列表或者评价列表,默认显示商品列表
      foodList: [], // 食品列表
      buyCartNum: 0, // 购物车总数量
      buyCartPrice: 0, // 购物车总价格
      lefts: null, // 左侧导航滚动实例
      rights: null, // 右侧导航滚动实例
      listHeight: [], // 右侧内容高度集合
      scrollY: 0, // 实时获取当前Y轴的高度
      clickEvent: false

    }
  },
  computed: {
    // 配送费
    deliveryFee: function () {
      if (this.shopDetailMessage) {
        return this.shopDetailMessage.float_delivery_fee
      } else {
        return 0
      }
    },
    // 差多少钱可以结算配送
    minimumOrderAmount: function () {
      if (this.shopDetailMessage) {
        // 当购物车总数量，价格改变时,需要改变此值
        return this.shopDetailMessage.float_minimum_order_amount - this.buyCartPrice
      } else {
        return 0
      }
    },
    currentIndex () {
      // 从0开始，因为this.listHeight的第一个值为0
      for (let i = 0; i < this.listHeight.length; i++) {
        let h1 = this.listHeight[i]
        let h2 = this.listHeight[i + 1]
        if (!h2) {
          return i
        } else {
          if (this.scrollY >= h1 && this.scrollY < h2) {
            return i
          } else if (this.scrollY < h1) {
            return i - 1
          }
        }
      }
      return 0
    }
  },
  components: {
    headTop,
    buyCart,
    imgLoading
  },
  mixins: [getImgPath],
  methods: {
    ...mapMutations(['FOODS_NUM']),
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
    // 获取食品列表数据
    getFoodList () {
      let params = {restaurant_id: this.shopid}
      homeApi.getFoodList(params).then(res => {
        res.data.forEach((item, index) => {
          item.categoryNum = 0 // 增加一个当前商品选择分类总数的字段
          item.foods.forEach(val => { // 增加一个当前商品选择数量的字段
            val.foodNum = 0
          })
        })
        this.foodList = res.data
        this.isLoading = false
      })
    },
    // tab切换
    tab (type) {
      this.options = type
    },
    // 食品左侧导航
    navTab (index, event) {
      this.clickEvent = true
      if (!event._constructed) {
        return false
      } else {
        let rightItems = this.$refs.right.querySelectorAll('.right-item')
        let el = rightItems[index]
        this.rights.scrollToElement(el, 500)
      }
    },
    // 减少
    reduce (parentId, childrenId, onePrice) {
      this.foodList.forEach(item => {
        if (item.id === parentId) {
          item.categoryNum--
        }
        item.foods.forEach(val => {
          if (val.item_id === childrenId) {
            val.foodNum--
            this.buyCartNum--
            this.buyCartPrice -= onePrice
            this.FOODS_NUM(this.foodList)
          }
        })
      })
    },
    // 增加
    increase (parentId, childrenId, onePrice) {
      this.foodList.forEach(item => {
        if (item.id === parentId) {
          item.categoryNum++
        }
        item.foods.forEach(val => {
          if (val.item_id === childrenId) {
            val.foodNum++
            this.buyCartNum++
            this.buyCartPrice += onePrice
            this.FOODS_NUM(this.foodList)
          }
        })
      })
    },
    initScroll () {
      this.lefts = new Bscroll(this.$refs.left, {
        click: true
      })
      this.rights = new Bscroll(this.$refs.right, {
        click: true,
        probeType: 3 // 探针的效果实时获取滚动的高度
      })
      // 右侧滚动元素对象监听滚动条事件,实时获取当前位置pos.y,并储存给scrollY
      this.rights.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
      this.rights.on('scrollStart', (pos) => {
        this.getListHeight()
      })
    },
    getListHeight () {
      this.listHeight = []
      let rightListItems = this.$refs.right.querySelectorAll('.right-item')
      let initHeight = 0
      this.listHeight.push(initHeight)
      for (let i = 0; i < rightListItems.length; i++) {
        let item = rightListItems[i]
        initHeight += item.clientHeight
        this.listHeight.push(initHeight)
      }
    }
  },
  created () {
    this.getUrlParams()
    this.getShopDetailData()
    this.getFoodList()
  },
  mounted () {
    this.$nextTick(() => {
      this.initScroll()
    })
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
  border-bottom: 1px solid #ebebeb;/*no*/
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
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  overflow: hidden;
  padding-bottom: 90px;
}
.left-nav{
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 150px;
  height: 100%;
  li{
    position: relative;
    padding: 40px 10px;
    text-align: left;
    border-left: 4px solid transparent;/*no*/
    img{
      width: 25px;
    }
    span{
      font-size: 28px;
      color: #666;
    }
    b{
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
      min-width: 30px;
      height: 30px;
      border-radius: 100%;
      font-size: 24px;
      color: #fff;
      text-align: center;
      background: #ff461d
    }
  }
  .active{
    background: #fff;
    border-color: #3190e8;
    i,span{
      font-weight: bold;
    }
  }
}
.right-list{
  position: absolute;
  width: 100%;
  height: 100%;
  padding-left: 150px;
  z-index: 9;
  top: 0;
  left: 0;
  overflow: hidden;
  ul{
    >li{
      h3{
        padding: 20px;
        height: 100px;
        line-height: 60px;
        font-size: 36px;
        font-weight: bold;
        color:#666;
        span{
          font-size: 28px;
          color: #999;
        }
      }
    }
  }
}
.typefood-list{
  li{
    position: relative;
    padding: 30px 20px;
    overflow: hidden;
  }
  .img-left-box{
    float: left;
    img{
      width: 90px;
      height: 90px;
    }
  }
}
.food-detail{
  padding-left: 110px;
  h4{
    padding-right: 60px;
    margin-bottom: 10px;
    line-height: 40px;
    span:nth-of-type(1){
      font-size: 32px;
      color: #333;
      font-weight: bold;
    }
    span:nth-of-type(2){
      padding: 0 10px;
      border: 1px solid #ff461d;/*no*/
      border-radius: 20px;
      font-size: 20px;
      color: #ff461d;
    }
  }
  .food-introdeuce{
    margin-bottom: 10px;
    font-size: 24px;
    color: #999;
  }
  .describe{
    margin-bottom: 20px;
    span{
      margin-right: 5px;
      font-size: 24px;
      color: #333;
    }
  }
}
.price-box{
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  .one-price{
    flex: 1;
    font-size: 36px;
    color: #f60;
    font-weight: bold;
  }
  .change-count{
    flex: 5;
    text-align: right;
    i{
      font-size: 40px;
      font-weight: bold;
      color: #3190e8
    }
    span{
      font-size: 36px;
      color: #666;
    }
  }
}
.foodlabel{
  position: absolute;
  left: -45px;
  top: -45px;
  z-index: 1;
  width: 90px;
  height:90px;
  text-align: center;
  line-height: 140px;
  transform: rotate(-45deg);
  background: #4cd964;
  i{
    font-size: 20px;
    color: #fff;
  }
}
.foodlabel2{
  position: absolute;
  top: 30px;
  right: 10px;
  z-index: 1;
  padding: 0 0.133333rem;
  border: 1px solid #ff461d;
  border-radius: 0.266667rem;
  i{
    font-size: 0.266667rem;
    color: #ff461d;
  }
}
</style>
