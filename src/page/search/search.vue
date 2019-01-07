<template>
  <div class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <div class="flex1">
      <form class="search-merchants" @submit.prevent>
        <input type="search" placeholder="请输入商家或美食名称" v-model="merchantName" @input="inputChange">
        <button @click="search('')">搜索</button>
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
      <div class="search-history" v-if="historyShow">
        <h4>搜索历史</h4>
        <ul>
          <li v-for="(historyItem,index) of searchHistoryList" @click="search(historyItem)" :key="index">
            <span>{{historyItem}}</span>
            <span @click.stop="cleanCurrentHistory(historyItem)">删除</span>
          </li>
        </ul>
        <div class="clean-history">
          <a href="javascript:;" @click="cleanAllHistory">清空搜索历史</a>
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
import localStore from '@/config/localStore'
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
      searchHistoryList: [], // 搜索历史列表
      historyShow: false
    }
  },
  components: {
    headTop,
    footBottom,
    alertTip
  },
  methods: {
    search (val) {
      let searchVal
      if (val) {
        searchVal = val
        this.merchantName = val
      } else {
        searchVal = this.merchantName
      }
      if (searchVal) {
        let params = {geohash: this.geohash, keyword: searchVal}
        searchApi.getSearchResult(params).then(res => {
          if (res.data.length === 0) {
            this.noResult = true
          } else {
            this.noResult = false
          }
          this.searchResultList = res.data
        })
        this.searchHistoryFun(searchVal)
      } else {
        this.showAlertTip = true
        this.alertContent = '请输入商家信息'
      }
    },
    // 历史搜索记录
    searchHistoryFun (inputVal) {
      if (inputVal) {
        let isAdd = true
        if (this.searchHistoryList.length > 0) {
          isAdd = this.searchHistoryList.some(val => {
            return val === inputVal
          })
          if (!isAdd) {
            this.searchHistoryList.push(inputVal)
          }
        } else {
          this.searchHistoryList.push(inputVal)
        }
        this.historyShow = false
      } else {
        let historyVal = JSON.parse(localStore.getStorage('history'))
        if (historyVal === null || historyVal.length === 0) {
          this.historyShow = false
          this.searchHistoryList = []
        } else {
          this.historyShow = true
          this.searchHistoryList = historyVal
        }
      }
      localStore.setStorage('history', this.searchHistoryList)
    },
    inputChange () {
      if (this.merchantName === '') {
        this.searchResultList = []
      }
      this.noResult = false
      this.searchHistoryFun()
    },
    // 清除当前历史纪录
    cleanCurrentHistory (val) {
      let LocalHistoryList = JSON.parse(localStore.getStorage('history'))
      LocalHistoryList = LocalHistoryList.filter(item => {
        return item !== val
      })
      localStore.setStorage('history', LocalHistoryList)
      this.searchHistoryFun()
    },
    // 全部清除历史记录
    cleanAllHistory () {
      localStore.removeStorage('history')
      this.searchHistoryFun()
    }
  },
  created () {
    this.geohash = this.$route.query.geohash
    this.searchHistoryFun()
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
