<template>
  <section class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <section class="select-box">
      <!-- 分类 -->
      <section :class="{openList:byType ==='food'}">
        <h2 @click="choose('food')">分类<i class="iconfont icon-sanjiao_xia"></i></h2>
      </section>
      <!-- 排序 -->
      <section :class="{openList:byType==='sort'}">
        <h2 @click="choose('sort')">排序<i class="iconfont icon-sanjiao_xia"></i></h2>
        <transition name="showlist">
          <section class="sorttypelist" v-show="byType==='sort'">
            <ul>
              <li :class="{active:sortType===0}" @click="chooseSortType(0)">
                <i class="iconfont icon-paixu" style="color:rgb(59,135,200)"></i>
                <span>智能排序</span>
                <i class="right iconfont icon-xuanze"></i>
              </li>
              <li :class="{active:sortType===5}" @click="chooseSortType(5)">
                <i class="iconfont icon-position-o" style="color:rgb(59,135,200)"></i>
                <span>距离最近</span>
                <i class="right iconfont icon-xuanze"></i>
              </li>
              <li :class="{active:sortType===6}" @click="chooseSortType(6)">
                <i class="iconfont icon-xiaoliangpaixu" style="color:rgb(231,24,24)"></i>
                <span>销量最高</span>
                <i class="right iconfont icon-xuanze"></i>
              </li>
              <li :class="{active:sortType===1}" @click="chooseSortType(1)">
                <i class="iconfont icon-jiage" style="color:rgb(245,188,2)"></i>
                <span>起送价最低</span>
                <i class="right iconfont icon-xuanze"></i>
              </li>
              <li :class="{active:sortType===2}" @click="chooseSortType(2)">
                <i class="iconfont icon-shijian" style="color:rgb(59,135,200)"></i>
                <span>配货速度最快</span>
                <i class="right iconfont icon-xuanze"></i>
              </li>
              <li :class="{active:sortType===3}" @click="chooseSortType(3)">
                <i class="iconfont icon-pingfen" style="color:rgb(245,188,2)"></i>
                <span>评分最高</span>
                <i class="right iconfont icon-xuanze"></i>
              </li>
            </ul>
          </section>
        </transition>
      </section>
      <!-- 筛选 -->
      <section :class="{openList:byType==='activity'}">
        <h2 @click="choose('activity')">筛选<i class="iconfont icon-sanjiao_xia"></i></h2>
        <transition name="showlist">
          <section class="activity" v-show="byType==='activity'">
            <section class="choose-title">
              <p class="activity-title">配送方式</p>
              <ul>
                <li v-for="(item,index) of foodDelivery" :key="index">
                  <span :class="{ischoose:chooseDeliveryType===item.id}" @click="deliveryChoose(item.id)"><i class="iconfont icon-xuanze"></i>{{item.text}}</span>
                </li>
              </ul>
            </section>
            <section class="choose-title">
              <p class="activity-title">商家属性(可以多选)</p>
              <ul>

                <li v-for="(item,index) of activityArr" :key="item.id"><span :class="{ischoose:activityAttrType[index]}" @click="activityArrChoose(index)"><i class="iconfont icon-xuanze"></i>{{item.name}}</span></li>
              </ul>
            </section>
            <section class="choose-btn">
              <button @click="clean">清空</button>
              <button>确定</button>
            </section>
          </section>
        </transition>
      </section>
    </section>
    <section class="flex1">
      <shop-list :geohash="geohash" :sortType="sortType"></shop-list>
    </section>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
import shopList from '@/components/common/shopList'
import homeApi from '@/service/homeApi'
export default {
  data () {
    return {
      headTitle: '所有商家',
      byType: '', // 当前点击的选项
      sortType: '', // 排序方式
      geohash: '', // 当前定位经纬度
      foodDelivery: [], // 筛选功能中的配送方式列表
      chooseDeliveryType: 0, // 标记已选择的配送方式
      chooseDeliveryTypeCopy: null, //  每次清空已选择的配送方式之前先储存
      activityAttrType: [], // 商家属性是否已经选择列表
      activityArr: [], // 商家属性列表
      activityAttrTypeCopy: [] // 每次清空已选择的商家属性之前先储存
    }
  },
  components: {
    headTop,
    shopList
  },
  methods: {
    // 获取url参数
    getParams () {
      this.headTitle = this.$route.query.title
      this.geohash = this.$route.query.geohash
    },
    // 选择
    choose (chooseType) {
      /** 选中状态下的选项再次选择时回归初始状态 */
      if (this.byType === chooseType) {
        this.byType = ''
      } else {
        if (chooseType === 'food') {
          this.byType = 'food'
        } else if (chooseType === 'sort') {
          this.byType = 'sort'
        } else {
          this.byType = 'activity'
        }
      }
    },
    // 选择排序方式
    chooseSortType (num) {
      // 通过传入数字,判断排序方式
      switch (num) {
        case 0:
          this.sortType = 0
          this.byType = ''
          break
        case 1:
          this.sortType = 1
          this.byType = ''
          break
        case 2:
          this.sortType = 2
          this.byType = ''
          break
        case 3:
          this.sortType = 3
          this.byType = ''
          break
        case 4:
          this.sortType = 4
          this.byType = ''
          break
        case 5:
          this.sortType = 5
          this.byType = ''
          break
        case 6:
          this.sortType = 6
          this.byType = ''
          break
        default:
          return false
      }
    },
    // 获取配送方式数据
    getFoodDelivery () {
      let params = {latitude: this.geohash.split(',')[0], longitude: this.geohash.split(',')[1]}
      homeApi.getFoodDelivery(params).then(res => {
        this.foodDelivery = res.data
      })
    },
    // 获取商家属性数据
    getActivityAttr () {
      let params = {latitude: this.geohash.split(',')[0], longitude: this.geohash.split(',')[1]}
      homeApi.getActivityAttr(params).then(res => {
        this.activityArr = res.data
        res.data.forEach(item => { // 设置默认商家属性都为未选择
          this.activityAttrType.push(false)
        })
      })
    },
    // 选择配送方式
    deliveryChoose (id) {
      if (this.chooseDeliveryType === id) {
        this.chooseDeliveryType = 0 // 如果已经有选择的,并且再次点击时,取消选择
      } else {
        this.chooseDeliveryType = id
      }
    },
    // 选择商家属性(可多选)
    activityArrChoose (index) {
      // this.activityAttrType[index] = !this.activityAttrType[index]
      this.$set(this.activityAttrType, index, !this.activityAttrType[index]) // vue中的对象和数组通过key或index修改或增加值时,不会触发视图的更新
    },
    // 清空
    clean () {
      this.chooseDeliveryTypeCopy = this.chooseDeliveryType
      this.chooseDeliveryType = 0
      this.activityAttrTypeCopy = this.activityAttrType.map(item => {
        return item
      })
      this.activityAttrType = this.activityAttrType.map(item => {
        if (item) {
          item = false
        }
        return item
      })
    }
  },
  created () {
    this.getParams()
    this.getFoodDelivery()
    this.getActivityAttr()
  }
}
</script>
<style lang="scss" scoped>
.select-box{
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  section{
    flex: 1;
  }
  h2{
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 28px;
    color: #333;
    i{
      display: inline-block;
      transition: all 0.3s;
      margin: 0 5px;
      color: #666;
      vertical-align: middle;
    }
  }
}
.openList{
  h2{
    color: #3190e8;
    i{
      transform: rotate(180deg);
      color: #3190e8;
      margin-top: -10px;
    }
  }
}
.sorttypelist{
  position: absolute;
  left: 0;
  top: 80px;
  z-index: 10;
  width: 100%;
  background: #fff;
  ul{
    width: 100%;
    li{
      height: 120px;
      line-height: 120px;
      padding: 0 20px 0 40px;
      i{
        font-size: 32px;
      }
      span{
        margin: 0 10px;
        color: #666;
      }
      .icon-xuanze{
        color: #3190e8;
        display: none;
      }
    }
    .active{
      .icon-xuanze{
        display: block;
      }
    }
  }
}
.activity{
  position: absolute;
  left: 0;
  top: 80px;
  z-index: 10;
  width: 100%;
  background: #f1f1f1;
}
.choose-title{
  background: #fff;
  padding:20px;
  ul{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  li{
    width: 33.333%;
    height: 100px;
    padding: 10px;
    span{
      display: block;
      height: 100%;
      padding-left: 20px;
      border: 1px solid #e4e4e4;/*no*/
      border-radius: 10px;
      line-height: 78px;
      text-align: left;
      color: #333;
      i{
        font-size: 28px;
        color: #3190e8;
        margin-right: 10px;
        visibility: hidden;
      }
    }
    .ischoose{
      i{
        visibility: visible;
      }
    }
  }
}
.activity-title{
  padding-left: 20px;
  height: 70px;
  line-height: 70px;
  font-size: 28px;
  color: #333;
}
.choose-btn{
  padding: 20px;
  font-size: 0;
  button{
    width: 49%;
    height: 90px;
    line-height: 90px;
    border-radius: 10px;
    font-size: 32px;
    text-align: center;
  }
  button:first-child{
    margin-right: 2%;
    background: #fff;
    color: #333;
  }
  button:last-child{
    background: #56d176;
    color: #fff;
  }
}
.showlist-enter-active,.showlist-leave-active {
  transition: all 0.3s;
  opacity: 1;
  // transform: translateY(0);
}
.showlist-enter,.showlist-leave-active {
  opacity: 0;
  // transform: translateY(-100%);
}
</style>
