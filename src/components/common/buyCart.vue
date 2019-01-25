 <template>
  <section>
    <section class="buyCart">
      <section class="cart">
        <section :class="{active:minimumOrderAmount<=0}" @click="openBuyCart">
          <i class="iconfont icon-gouwuche"></i>
          <span v-if="buyCartNum">{{buyCartNum}}</span>
        </section>
      </section>
      <section class="total-money">
        <p>￥{{buyCartPrice.toFixed(2)}}</p>
        <p>配送费￥{{deliveryFee}}</p>
      </section>
      <section class="start-money" v-if="minimumOrderAmount>0">还差￥{{minimumOrderAmount}}元起送</section>
      <section class="start-money endPay" v-else @click="topay">去结算</section>
    </section>
    <transition name="cartList">
      <section class="cartList" v-if="isShowCartList">
        <h4>购物车<a href="javascript:;" @click="cleanCart"><i class="iconfont icon-shanchu"></i>清空</a></h4>
        <ul>
          <li v-for="(item,index) of cartList" :key="index">
            <div class="ellipsis">{{item.name}}</div>
            <div>￥{{item.specfoods[0].price}}</div>
            <div>
              <i class="iconfont icon-jian" @click="cartReduce(item.parentId,item.item_id,item.specfoods[0].price)"></i>
              <span>{{item.foodNum}}</span>
              <i class="iconfont icon-jia" @click="cartIncrease(item.parentId,item.item_id,item.specfoods[0].price)"></i>
            </div>
          </li>
        </ul>
      </section>
    </transition>
    <transition name="cartList-mask">
      <section class="mask" v-if="isShowCartList"></section>
    </transition>
    <alert-tip :showAlertTip.sync="showAlertTip" :alertContent="alertContent" @callback="callback"></alert-tip>
  </section>
</template>
<script>
import alertTip from '@/components/common/alertTip'
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      showAlertTip: false,
      alertContent: '',
      isShowCartList: false, // 购物车列表默认隐藏
      cartList: [] // 购物车列表
    }
  },
  computed: {
    ...mapState(['foodsList'])
  },
  /**
   * buyCartNum:购物车数量
   * buyCartPrice:购物车总价钱
   * deliveryFee:配送费
   * minimumOrderAmount:差多少钱可以起送
   */
  props: ['buyCartNum', 'buyCartPrice', 'deliveryFee', 'minimumOrderAmount'],
  components: {
    alertTip
  },
  methods: {
    ...mapMutations(['FOODS_NUM']),
    // 去支付
    topay () {
      this.showAlertTip = true
      this.alertContent = '确定支付' + (this.buyCartPrice + this.deliveryFee)
    },
    // alertTip的子组件emit回调
    callback () {
      if (this.alertContent.indexOf('确定支付') !== -1) {
        this.$router.push({path: '/payment', query: {totalPrice: this.buyCartPrice + this.deliveryFee}})
        // 清空购物车列表数据弹出层确定的回调
      } else if (this.alertContent.indexOf('清除购物车') !== -1) {
        // 先将数据列表中的数量清0
        this.foodsList.forEach(item => {
          item.categoryNum = 0
          item.foods.forEach(food => {
            food.foodNum = 0
          })
        })
        this.FOODS_NUM(this.foodsList)
        // 数据列表为空
        this.cartList = []
        // 改变父组件中的总数量,总金额
        this.$emit('update:buyCartNum', 0)
        this.$emit('update:buyCartPrice', 0)
        // 购物车隐藏
        this.isShowCartList = false
      }
    },
    // 获取购物车列表
    getCartList () {
      this.foodsList.forEach(item => {
        item.foods.forEach(food => {
          if (food.foodNum > 0) {
            // 如果当前的商品已经存在列表当中返回true,则不重复添加
            let flag = this.cartList.some(content => {
              return content.item_id === food.item_id
            })
            // 不存在购物车列表中,添加进购物车
            if (!flag) {
              let newData = Object.assign({}, food, {parentId: item.id})
              this.cartList.push(newData)
            } else {
              // 存在购物车列表中,每次都更新数量值
              this.cartList.forEach((content, index) => {
                if (content.item_id === food.item_id) {
                  content.foodNum = food.foodNum
                }
              })
            }
          } else {
            // 将数量变为0,在购物车列表中清除此条数据
            this.cartList.forEach((content, index) => {
              if (content.item_id === food.item_id) {
                this.cartList.splice(index, 1)
              }
            })
          }
        })
      })
    },
    // 打开购物车列表
    openBuyCart () {
      if (this.buyCartNum > 0) {
        // 只有页面打开的时候获取列表
        if (!this.isShowCartList) {
          this.getCartList()
        }
        this.isShowCartList = !this.isShowCartList
      } else {
        this.showAlertTip = true
        this.alertContent = '购物车为空，请先去添加商品'
      }
    },
    cartReduce (parentId, childId, OnePrice) {
      this.cartList.forEach((item, index) => {
        if (item.item_id === childId) {
          item.foodNum--
          if (item.foodNum === 0) {
            this.cartList.splice(index, 1)
            if (this.cartList.length === 0) {
              this.isShowCartList = false
            }
          }
        }
      })
      this.$emit('reduce', parentId, childId, OnePrice)
    },
    cartIncrease (parentId, childId, OnePrice) {
      this.cartList.forEach((item, index) => {
        if (item.item_id === childId) {
          item.foodNum++
        }
      })
      this.$emit('increase', parentId, childId, OnePrice)
    },
    // 清空购物车
    cleanCart () {
      this.showAlertTip = true
      this.alertContent = '确认清除购物车'
    }
  }
}
</script>
<style lang="scss" scoped>
.buyCart{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 90px;
  background:#3d3d3f;
}
.cart{
  position: absolute;
  left: 20px;
  top: -40px;
  z-index: 10;
  width: 110px;
  height: 110px;
  padding: 10px;
  line-height: 110px;
  border-radius: 100%;
  box-shadow: 0 0 5px #888888;
  background: #3d3d3f;
  text-align: center;
  section{
    width: 100%;
    height: 100%;
    line-height: 90px;
    border-radius: 100%;
    background: #3d3d3f;
  }
  .active{
    background: #3190e8;
  }
  i{
    font-size: 60px;
    color: #fff;
  }
  span{
    position: absolute;
    top: -5px;
    right: 5px;
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 100%;
    color: #fff;
    background: #ff461d;
  }
}
.total-money{
  padding: 0 300px 0 150px;
  height: 90px;
  p{
    color: #fff;
  }
  p:nth-of-type(1){
    line-height: 50px;
    font-size: 36px;
    font-weight: bold;
  }
  p:nth-of-type(2){
    line-height: 40px;
    font-size: 24px;
  }
}
.start-money{
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  padding: 0 20px;
  width: 280px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  background: #535356;
}
.endPay.start-money{
  background: #4cd964;
}
.cartList{
  position: fixed;
  bottom: 90px;
  left: 0;
  z-index: 99;
  width: 100%;
  background: #fff;
  h4{
    height: 80px;
    padding: 0 20px;
    line-height: 80px;
    background: #eceff1;
    text-align: left;
    font-size: 32px;
    color: #666;
    font-weight: bold;
    a{
      float: right;
      font-size: 28px;
      color: #666;
      i{
        font-size: 28px;
        color: #999;
        margin-right: 10px;
      }
    }
  }
  ul{
    padding-bottom: 20px;
    max-height: 644px;
    overflow-y: auto;
  }
  li{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    line-height: 60px;
    div:nth-of-type(1){
      flex: 5;
      font-size: 32px;
      color: #666;
      font-weight: bold;
    }
    div:nth-of-type(2){
      flex: 2;
      font-size: 28px;
      color:#f60;
      font-weight: bold;
    }
    div:nth-of-type(3){
      flex: 3;
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
}
.mask{
  position: fixed;
  top: 0;
  bottom: 0;
  left:0;
  right:0;
  z-index: 88;
  background: rgba(0,0,0,.3);
}
.cartList-enter-active,
.cartList-leave-active{
  transition: all .3s;
}
.cartList-enter,
.cartList-leave-active{
  opacity: 0;
  transform: translateY(100%);
}
.cartList-mask-enter-active,
.cartList-mask-leave-active{
  transition: all .3s;
}
.cartList-mask-enter,
.cartList-mask-leave-active{
  opacity: 0;
}
</style>
