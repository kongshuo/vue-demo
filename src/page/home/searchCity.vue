<template>
  <div class="search-city-box app">
    <head-top :isGoBack="true" :headTitle="headTitle">
      <router-link to="/home" class="tagcity" slot="rightContent">切换城市</router-link>
    </head-top>
    <div class="flex1">
      <form class="search-city-form" @submit.prevent>
        <input type="search" v-model.trim="searchAddress" placeholder="输入学校、商务楼、地址" required>
        <button @click="search">搜索</button>
      </form>
      <h4 class="search-history">
        <span v-if="searchHistory">搜索历史：</span>
        <span v-else>
          <span v-if="searchTotal > 0">搜索共(<i style="color:#3190e8;">{{searchTotal}}</i>)条结果：</span>
          <span v-else>很抱歉，无搜索结果</span>
        </span>
      </h4>
      <section class="search-address-list">
        <ul>
          <li v-for="(item,index) of searchAddressList" :key="index" @click="nextPage(item,index)">
            <h4 class="ellipsis">{{item.name}}</h4>
            <p class="ellipsis">{{item.address}}</p>
          </li>
        </ul>
        <ul v-if='searchHistory&&searchHistoryList.length>0'>
          <li v-for="(item,index) of searchHistoryList" :key="index" @click="nextPage(item,index)">
            <h4 class="ellipsis">{{item.name}}</h4>
            <p class="ellipsis">{{item.address}}</p>
          </li>
          <div class="clear-all">
            <a href="javascript:;" @click="clearAll">清空所有</a>
          </div>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import homeApi from '@/service/homeApi'
import localStorageApi from '@/config/localStore'
import alertTip from '@/components/common/alertTip'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      headTitle: null, // 当前城市
      searchAddress: null, // 搜索城市地址
      searchHistory: true, // 搜索历史标签显示
      searchAddressList: [], // 搜索城市地址列表
      searchTotal: null, // 搜索结果条数
      searchHistoryList: [] // 搜索历史列表
    }
  },
  components: {
    headTop,
    alertTip
  },
  methods: {
    ...mapMutations(['SAVE_GEOHASH']),
    // 获取所选城市接口
    getCity () {
      let cityId = this.$route.query.cityId
      homeApi.currentCity(cityId).then(res => {
        this.headTitle = res.data.name
      })
    },
    // 搜索地址
    search () {
      if (this.searchAddress) {
        let cityId = this.$route.query.cityId
        homeApi.getSearchAddress(cityId, this.searchAddress).then(res => {
          this.searchHistory = false
          this.searchTotal = res.data.length
          this.searchAddressList = res.data
        })
      }
    },
    // 初始化历史
    initHistory () {
      let placeHistory = JSON.parse(window.localStorage.getItem('placeHistroy'))
      if (placeHistory !== null) {
        this.searchHistoryList = placeHistory.map(item => item)
      } else {
        this.searchHistoryList = []
      }
    },
    // 具体地址内容跳转
    nextPage (item, index) {
      let placeHistory = JSON.parse(window.localStorage.getItem('placeHistroy')) // localStorage中是否有placeHistory
      if (placeHistory !== null) {
        let isAdd = placeHistory.some(ele => {
          if (ele.geohash === item.geohash) {
            return true
          }
        })
        if (!isAdd) {
          this.searchHistoryList.push(item)
        }
      } else {
        this.searchHistoryList.push(item)
      }
      localStorageApi.setStorage('placeHistroy', this.searchHistoryList)
      this.SAVE_GEOHASH(item.geohash)
      this.$router.push({path: '/msite', query: {geohash: item.geohash}})
    },
    // 清空所有
    clearAll () {
      // 正常应该加一个弹窗提示，在此省略
      localStorageApi.removeStorage('placeHistroy')
      this.initHistory()
    }
  },
  mounted () {
    this.initHistory()
    this.getCity()
  }
}
</script>
<style lang="scss" scoped>
.tagcity{
  position: absolute;
  top: 0;
  right: 20px;
  z-index: 10;
  display: block;
  height: 90px;
  line-height: 90px;
  text-align: center;
  font-size: 28px;
  color: #fff;
  font-weight: bold;
}
.search-city-form{
  margin-top: 20px;
  padding: 20px 40px;
  border-top: 1px solid #e4e4e4;/*no*/
  border-bottom: 2px solid #e4e4e4;/*no*/
  background-color: #fff;
  input{
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    border: 1px solid #e4e4e4;/*no*/
  }
  button{
    width: 100%;
    height: 60px;
    margin-top: 20px;
    line-height: 60px;
    border-radius: 5px;
    text-align: center;
    font-size: 28px;
    color: #fff;
    font-weight: bold;
    border: 0;
    background-color: #3190e8;
  }
}
.search-history{
  padding: 20px 40px;
  font-size: 28px;
  color: #666;
  border-bottom: 1px solid #e4e4e4;/*no*/
}
.search-address-list{
  li{
    padding: 20px 40px;
    border-top:1px solid #e4e4e4;/*no*/
    border-bottom:1px solid #e4e4e4;/*no*/
  }
  h4{
    font-size: 28px;
    color: #333;
    margin-bottom: 10px;
  }
  p{
    font-size: 24px;
    color: #666;
  }
}
.clear-all{
  height: 100px;
  line-height: 60px;
  padding: 20px 0;
  text-align: center;
  a{
    font-size: 32px;
    color: #999;
  }
}
</style>
