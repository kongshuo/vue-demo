<template>
  <div class="location app">
    <head-top>
      <a href="javascript:;" slot="logo" class="logo left" @click="reload">ele.me</a>
      <a href="javascript:;" slot="login" class="login right" @click="login" v-if="!isLogin">登录|注册</a>
      <a href="javascript:;" slot="login" class="login right" v-if="isLogin" @click="toProfile">
        <i class="iconfont icon-yonghu" style="color:#fff;font-size:18px;font-weight:bold;"></i>
      </a>
    </head-top>
    <section class="location-content flex1">
      <div class="now-city">
        <p>
          <span class="left">当前定位城市:</span>
          <span class="right">定位不准时,请在城市列表中选择</span>
        </p>
        <a href="javascript:;" @click="toHref(cityGuessId)">
          <span>{{cityGuess}}</span>
          <i class="right iconfont icon-jinru"></i>
        </a>
      </div>
      <div class="hot-city">
        <h3 class="hot-city-title">热门城市</h3>
        <ul class="clearfix">
          <li v-for="(itemCity,index) of cityHot" :key="index" @click="toHref(itemCity.id)">
            <a href="javascript:;">{{itemCity.name}}</a>
          </li>
        </ul>
      </div>
      <div class="city-list">
        <ul class="topList">
          <li v-for="(cityItems,key,index) of sortAfterCityAll" :key="index">
              <h3>{{key==="A" ? "A (按字母排序)" : key}}</h3>
              <ul class="childrenList clearfix">
                <li v-for="(cityItem,index) of cityItems" :key="index" @click="toHref(cityItem.id)">
                 <a href="javascript:;" class="ellipsis" :title="cityItem.name">{{cityItem.name}}</a>
                </li>
              </ul>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import homeApi from '@/service/homeApi'
import localStorageApi from '@/config/localStore'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      cityGuess: null, // 定位地址
      cityGuessId: null, // 定位地址Id
      cityHot: [], // 热门地址
      cityAll: {} // 全部地址
    }
  },
  components: {
    headTop
  },
  computed: {
    sortAfterCityAll () {
      let setSortDate = {}
      Object.keys(this.cityAll).sort().forEach(ele => {
        setSortDate[ele] = this.cityAll[ele]
      })
      return setSortDate
    },
    ...mapGetters({
      isLogin: 'isLogin'
    })
  },
  methods: {
    // 点击logo刷新页面
    reload () {
      window.location.reload()
    },
    // 跳转到登录页
    login () {
      this.$router.push({path: '/login'})
    },
    // 跳转到当前城市查询页
    toHref (pramas) {
      this.$router.push({path: '/searchCity', query: {cityId: pramas}})
    },
    // 获取用户信息
    getUserInfo () {
      let userId = localStorageApi.getStorage('user_id')
      if (userId) {
        this.$store.dispatch('getUserInfo', userId)
      }
    },
    // 跳转到个人中心
    toProfile () {
      this.$router.push({path: '/profile'})
    }
  },
  activated () {
    // 当前城市接口调用
    homeApi.cityGuess().then(res => {
      if (res.statusText === 'OK') {
        this.cityGuess = res.data.name
        this.cityGuessId = res.data.id
      }
    })
    // 热门城市接口调用
    homeApi.cityHot().then(res => {
      if (res.statusText === 'OK') {
        this.cityHot = res.data
      }
    })
    // 全部地址接口调用
    homeApi.cityAll().then(res => {
      if (res.statusText === 'OK') {
        this.cityAll = res.data
      }
    })
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.location{
  .logo,.login{
    display: inline-block;
    height: 100%;
    padding: 0 20px;
    line-height: 90px;
    font-size: 28px;
    color: #fff;
  }
}
.now-city{
  margin-top: 20px;
  background-color: #fff;
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
  background-color: #fff;
  .hot-city-title{
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    font-size: 26px;
    color: #666;
    border-bottom: 1px solid #e4e4e4;/*no*/
  }
  li{
    float: left;
    width: 25%;
    height: 80px;
    line-height: 80px;
    border-right: 1px solid #e4e4e4;/*no*/
    border-bottom: 1px solid #e4e4e4;/*no*/
    text-align: center;
    a{
      display: block;
      height: 100%;
      font-size:30px;
      color: #3190e8;
    }
  }
}
.city-list{
  margin-top: 20px;
  border-top: 2px solid #e4e4e4;/*no*/
  background-color: #fff;
}
.topList{
  h3{
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    font-weight: 400;
    font-size: 24px;
    color: #666;
    border-bottom: 1px solid #e4e4e4;/*no*/
  }
}
.childrenList{
  li{
    float: left;
    width: 25%;
    height: 80px;
    border-right: 1px solid #e4e4e4;/*no*/
    border-bottom: 1px solid #e4e4e4;/*no*/
    a{
      display: block;
      height: 100%;
      line-height:80px;
      text-align: center;
      font-size: 24px;
      color: #666;
    }
  }
}
</style>
