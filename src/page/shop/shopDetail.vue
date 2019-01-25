<template>
  <section class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <section class="flex1">
      <h4 class="title">活动和属性</h4>
      <ul class="list">
        <li v-for="item in shopDetail.activities" :key="item.id">
          <span :style="{backgroundColor: '#' + item.icon_color}" class="first">{{item.icon_name}}</span>
          <span>{{item.description}}(APP专享)</span>
        </li>
      </ul>
      <ul class="list">
        <li v-for="item in shopDetail.supports" :key="item.id">
            <span :style='{backgroundColor: "#" + item.icon_color}' class="first">{{item.icon_name}}</span>
            <span>{{item.description}}(APP专享)</span>
        </li>
      </ul>
      <h4 class="title">食品监督安全公示</h4>
      <h4 class="title">监督检查结果</h4>
      <ul class="list">
        <li>{{shopDetail.status===1?'良好':'差'}}</li>
      </ul>
      <h4 class="title">检查时间</h4>
      <ul class="list">
        <!-- <li>{{shopDetail.identification.identificate_date && shopDetail.identification.identificate_date.split('T')[0]}}</li> -->
        <li>{{shopDetail.identification.identificate_date?shopDetail.identification.identificate_date:''}}</li>
      </ul>
      <h4 class="title">商家信息</h4>
      <ul class="list">
        <li>{{shopDetail.name}}</li>
        <li>地址：{{shopDetail.address}}</li>
        <li>营业时间：[{{shopDetail.opening_hours[0]}}]</li>
        <li>营业执照</li>
        <li>餐饮服务许可证</li>
      </ul>
    </section>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
import homeApi from '@/service/homeApi'
export default {
  data () {
    return {
      headTitle: '商家详情',
      shopDetail: {},
      shopId: '',
      latitude: '',
      longitude: ''
    }
  },
  components: {
    headTop
  },
  methods: {
    getUrlParams () {
      this.shopId = this.$route.query.shopId
      this.latitude = this.$route.query.latitude
      this.longitude = this.$route.query.longitude
    },
    getShopDetail () {
      let params = {shopid: this.shopId, latitude: this.latitude, longitude: this.longitude}
      homeApi.getShopDetail(params).then(res => {
        this.shopDetail = res.data
      })
    }
  },
  created () {
    this.getUrlParams()
    this.getShopDetail()
  }
}
</script>
<style lang="scss" scoped>
.title{
  height: 90px;
  padding: 0 20px;
  margin-top: 20px;
  line-height: 90px;
  border-bottom: 1px solid #f1f1f1;/*no*/
  font-size: 32px;
  color: #333;
  background: #fff;
}
.list{
  background: #fff;
  padding:20px 0;
  li{
    padding:0 20px;
    font-size: 28px;
    color: #666;
    line-height: 60px;
    span{
      font-size: 28px;
      color: #666;
    }
    .first{
      color: #fff;
      padding:2px 5px;
      border-radius: 10px;
    }
  }
}
</style>
