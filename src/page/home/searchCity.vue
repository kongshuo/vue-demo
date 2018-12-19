<template>
  <div class="search-city-box app">
    <head-top :isGoBack="true" :headTitle="headTitle">
      <router-link to="/home" class="tagcity" slot="rightContent">切换城市</router-link>
    </head-top>
    <div class="flex1">
      <form class="search-city-form" @submit.prevent>
        <input type="text" v-model.trim="searchAddress" placeholder="输入学校、商务楼、地址" required>
        <button @click="search">搜索</button>
      </form>
      <h4 class="search-history">
        <span v-if="searchHistory">搜索历史：</span>
        <span v-else>搜索结果：</span>
      </h4>
      <section class="search-address-list">
        <ul>
          <li v-for="(item,index) of searchAddressList" :key="index">
            <h4 class="ellipsis">{{item.name}}</h4>
            <p class="ellipsis">{{item.address}}</p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import homeApi from '@/service/homeApi'
export default {
  data () {
    return {
      headTitle: null, // 当前城市
      searchAddress: null, // 搜索城市地址
      searchHistory: true, // 搜索历史标签
      searchAddressList: []// 搜索城市地址列表
    }
  },
  components: {
    headTop
  },
  methods: {
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
          if (res.data.length > 0) {
            this.searchHistory = false
            this.searchAddressList = res.data
          }
        })
      }
    }
  },
  // 使用Keep-alive的钩子函数,用来解决根组件复用不触发created，mounted的问题
  activated () {
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
</style>
