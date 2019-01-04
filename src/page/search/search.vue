<template>
  <div class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <div class="flex1">
      <form class="search-merchants" @submit.prevent>
        <input type="search" placeholder="请输入商家或美食名称" v-model="merchantName" @input="inputChange">
        <button @click="search">搜索</button>
      </form>
      <div class="search-result" v-if="searchResultList.length>0">
        <h4>商家</h4>
        <ul>
          <li v-for="(val,index) of searchResultList" :key="index">
            <img :src="imgBaseUrl+val.image_path" alt="">
            <p>{{val.name}}</p>
            <p>月售{{val.recent_order_num}}单</p>
            <p>{{val.float_minimum_order_amount}}元起送/距离{{val.distance}}</p>
          </li>
        </ul>
      </div>
       <div class="search-history" v-if="searchHistoryList.length>0&&searchResultList.length===0">
        <h4>搜索历史</h4>
        <ul>
          <li>
            <span>111123123</span>
            <span>删除</span>
          </li>
        </ul>
        <div class="clean-history">
          <a href="javascript:;">清空搜索历史</a>
        </div>
      </div>
      <p class="no-result" v-if="noResult">很抱歉，无搜索结果</p>
    </div>
    <foot-bottom></foot-bottom>
    <alert-tip :showAlertTip.sync="showAlertTip" :alertContent="alertContent"></alert-tip>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import footBottom from '@/components/footer/footer'
import alertTip from '@/components/common/alertTip'
import searchApi from '@/service/searchApi'
import {imgBaseUrl} from '@/config/env'
import localStorageFun from '@/config/localStore'
export default {
  data () {
    return {
      headTitle: '搜索',
      merchantName: '', // 输入框填入内容
      showAlertTip: false,
      alertContent: '',
      geohash: '', // 当前城市经纬度
      searchResultList: [],
      imgBaseUrl, // 图片路径
      noResult: false, // 无搜索结果提示
      searchHistoryList: [] // 搜索历史列表
    }
  },
  components: {
    headTop,
    footBottom,
    alertTip
  },
  methods: {
    search () {
      if (this.merchantName) {
        let params = {geohash: this.geohash, keyword: this.merchantName}
        searchApi.getSearchResult(params).then(res => {
          if (res.data.length === 0) {
            this.noResult = true
          } else {
            this.noResult = false
          }
          this.searchResultList = res.data
        })
        this.searchHistoryFun(this.merchantName)
      } else {
        this.showAlertTip = true
        this.alertContent = '请输入商家信息'
      }
    },
    // 历史搜索记录
    searchHistoryFun (inputVal) {
      let localVal = JSON.parse(localStorageFun.getStorage('searchHistory'))
      let isAdd = false
      if (localVal !== null && localVal.length > 0) {
        localVal.some(item => { // 判断是否已经添加过
          if (item === inputVal) {
            isAdd = true
          }
        })
      }
      if (!isAdd) {
        this.searchHistoryList.push(inputVal)
      }
      localStorageFun.setStorage('searchHistory', this.searchHistoryList)
    },
    inputChange () {
      if (this.merchantName === '') {
        this.searchResultList = []
      }
    }
  },
  created () {
    this.geohash = this.$route.query.geohash
  }
}
</script>
<style lang="scss" scoped>
.search-merchants{
  position: relative;
  padding: 20px 180px 20px 20px;
  background: #fff;
  input{
    width:100%;
    height: 70px;
    padding-left: 10px;
    line-height: 68px;
    border: 1px solid #ddd;/*no*/
    border-radius: 10px;
    font-size: 24px;
    color: #666;
    font-weight: bold;
    background: #f2f2f2;
  }
  button{
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 9;
    width: 150px;
    height: 70px;
    border-radius: 10px;
    line-height: 70px;
    text-align: center;
    font-size: 28px;
    color: #fff;
    background: #3190e8;
  }
}
.search-result{
  h4{
    height: 90px;
    line-height: 90px;
    padding: 0 20px;
    font-size: 28px;
    font-weight: bold;
    color: #666;
  }
  ul{
    background: #fff;
    li{
      padding:20px;
      border-bottom: 1px solid #ddd;/*no*/
      :last-child{
        border:0;
      }
      img{
        float: left;
        width: 80px;
        line-height: 80px;
      }
      p{
        padding-left: 100px;
        line-height: 40px;
      }
    }
  }
}
.no-result{
  margin-top: 40px;
  line-height: 90px;
  text-align: center;
  font-size: 28px;
  color: #666;
}
.search-history{
  background: #fff;
  h4{
    height: 90px;
    line-height: 90px;
    padding: 0 20px;
    font-size: 28px;
    font-weight: bold;
    color: #666;
  }
  ul{
    background: #fff;
  }
  li{
    padding: 0 20px;
    border-bottom: 1px solid #ddd;/*no*/
    span:nth-of-type(1){
      display: inline-block;
      width: 85%;
      height: 90px;
      line-height: 90px;
    }
    span:nth-of-type(2){
      float: right;
      height: 90px;
      line-height: 90px;
      font-weight: bold;
      font-size: 28px;
      color: #666;
    }
  }
}
.clean-history{
  height:100px;
  line-height: 100px;
  text-align: center;
  a{
    font-size: 28px;
    color: #3190e8;
  }
}
</style>
