<template>
  <div class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <div class="flex1">
      <div class="search-address">
        <input type="text" placeholder="请输入小区/写字楼/学校等" v-model.trim="fillAddress">
        <button @click="confirmSearch">确认</button>
      </div>
      <p class="advice">为了满足商家的送餐要求，建议您从列表中选择地址</p>
      <div class="address-list" v-if="addressList.length>0">
        <ul>
          <li v-for="(val,index) of addressList" :key="index" @click="selectAddress(val.name)">
            <p>{{val.name}}</p>
            <p>{{val.address}}</p>
          </li>
        </ul>
      </div>
      <div class="no-address" v-else>
        <p>找不到地址？</p>
        <p>请尝试输入小区、写字楼或学校名</p>
        <p>详细地址（如门牌号）可稍后输入哦。</p>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import homeApi from '@/service/homeApi'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      headTitle: '搜索地址',
      fillAddress: '', // 查询地址
      addressList: [] // 地址列表
    }
  },
  computed: {
    ...mapState(['newAddress'])
  },
  components: {
    headTop
  },
  methods: {
    ...mapMutations(['RESET_ADDRESS']),
    // 搜索地址
    confirmSearch () {
      let searchAddress = this.fillAddress
      homeApi.searchNearby(searchAddress).then(res => {
        this.addressList = res.data
      })
    },
    // 选择地址
    selectAddress (addressName) {
      this.fillAddress = addressName
      this.RESET_ADDRESS(addressName)
      this.$router.go(-1)
    }
  },
  created () {
    this.fillAddress = this.newAddress ? this.newAddress : ''
  }
}
</script>
<style lang="scss" scoped>
.search-address{
  position: relative;
  padding: 20px 170px 20px 20px;
  background: #fff;
  input{
    width: 100%;
    height: 80px;
    padding-left: 10px;
    line-height: 78px;
    border: 1px solid #ddd;/*no*/
    border-radius: 10px;
    font-size: 28px;
    background: #f2f2f2;
  }
  button{
    position: absolute;
    top:20px;
    right: 20px;
    z-index: 9;
    width: 140px;
    height: 80px;
    line-height: 80px;
    border-radius: 10px;
    text-align: center;
    font-size: 28px;
    color: #fff;
    background: #3199e8;
  }
}
.advice{
  line-height: 60px;
  font-size: 28px;
  color: #FF883F;
  text-indent: 1em;
  background: #FFF6E4;
}
.no-address{
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 9;
  width: 100%;
  transform: translateY(-50%);
  p{
    width: 100%;
    text-align: center;
    font-size: 28px;
    color: #969696;
    margin-bottom: 10px;
  }
}
.address-list{
  li{
    padding: 20px;
    border-top: 1px solid #ddd;/*no*/
    p{
      font-size: 24px;
      color: #666;
    }
    p:first-child{
      margin-bottom: 10px;
    }
  }
  li:first-child{
    border: 0;
  }
}
</style>
