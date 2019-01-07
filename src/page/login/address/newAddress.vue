<template>
  <div class="app">
    <head-top :isGoBack="true" :headTitle="headTitle">
      <a slot="rightContent" class="right-content" href="javascript:;" @click="edit">{{editContent}}</a>
    </head-top>
    <div class="flex1">
      <router-link class="new-address" :to="{path:'/editAddress'}">
        新增地址
        <i class="iconfont icon-jinru right"></i>
      </router-link>
      <ul class="addressList">
        <li v-for="(item,index) of addressList" :key="index">
          <p>{{item.address}}</p>
          <p>{{item.phone}}</p>
          <a href="javascript:;" v-if="isDelete" @click="deleteNow(index)">X</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      headTitle: '编辑地址',
      addressList: [],
      isDelete: false,
      editContent: '编辑'
    }
  },
  computed: mapState({
    afterAddress: 'afterAddress'
  }),
  components: {
    headTop
  },
  methods: {
    getAddressList () {
      this.addressList = this.afterAddress
    },
    edit () {
      if (this.editContent === '编辑') {
        this.editContent = '完成'
        this.isDelete = true
      } else {
        this.editContent = '编辑'
        this.isDelete = false
      }
    },
    deleteNow (index) {
      this.afterAddress.splice(index, 1)
      this.addressList = this.afterAddress
    }
  },
  created () {
    this.getAddressList()
  }
}
</script>
<style lang="scss" scoped>
.new-address{
  display: block;
  height: 90px;
  margin-top: 40px;
  padding: 0 20px;
  border-top: 1px solid #ddd;/*no*/
  border-bottom: 1px solid #ddd;/*no*/
  line-height: 88px;
  text-align: left;
  font-size: 28px;
  color: #666;
  background: #fff;
}
.addressList{
    margin-top: 20px;
  li{
    position: relative;
    padding: 10px 20px;
    border-top: 1px solid #ddd;/*no*/
    background: #FFF8C3;
    p{
      line-height: 50px;
      font-size: 28px;
      color: #666;
    }
    p:first-child{
      font-size: 32px;
    }
    a{
      position: absolute;
      right: 20px;
      top:50%;
      z-index: 9;
      font-size: 32px;
      color: #666;
      font-weight: bold;
      transform: translateY(-50%)
    }
  }
}
.right-content{
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  display: block;
  width: 90px;
  line-height: 90px;
  color: #fff;
  font-size: 32px;
}
</style>
