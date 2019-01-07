<template>
  <div class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <div class="flex1">
      <form class="select-mess" @submit.prevent>
        <div>
          <input type="text" placeholder="请填写你的姓名" v-model="name"/>
        </div>
        <div>
          <input type="text" placeholder="小区/写字楼/学校等" readonly @click="toSearchAddress" v-model="newAddress"/>
        </div>
        <div>
          <input type="text" placeholder="请填写详细送餐地址" v-model="address"/>
        </div>
        <div>
          <input type="text" placeholder="请填写能够联系到您的手机号" v-model="phone"/>
        </div>
        <div>
          <input type="text" placeholder="备用联系电话（选填）" v-model="readyPhone"/>
        </div>
        <button @click="newAdd">新增地址</button>
      </form>
    </div>
    <alert-tip :showAlertTip.sync="showAlertTip" :alertContent="alertContent"></alert-tip>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import alertTip from '@/components/common/alertTip'
import localStore from '@/config/localStore'
import homeApi from '@/service/homeApi'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      headTitle: '新增地址',
      name: '',
      address: '',
      phone: '',
      readyPhone: '',
      showAlertTip: '',
      alertContent: '',
      storeParams: {}
    }
  },
  computed: {
    ...mapState(['newAddress', 'getUserInfo', 'geohash', 'afterAddress'])
  },
  components: {
    headTop,
    alertTip
  },
  methods: {
    ...mapMutations([
      'AFTER_ADDRESS'
    ]),
    toSearchAddress () {
      this.$router.push({path: '/searchAddress'})
    },
    // 新增地址
    newAdd () {
      if (this.name === '') {
        this.showAlertTip = true
        this.alertContent = '请添加收获人'
      } else if (this.newAddress === '') {
        this.showAlertTip = true
        this.alertContent = '请选择收获地址'
      } else if (this.address === '') {
        this.showAlertTip = true
        this.alertContent = '请输入详细收获地址'
      } else if (this.phone === '') {
        this.showAlertTip = true
        this.alertContent = '请输入正确的手机号'
      } else if (!(/^[1][358][0-9]{9}$/).test(this.phone)) {
        this.showAlertTip = true
        this.alertContent = '请输入正确的手机号'
      } else if (!(/^[1][358][0-9]{9}$/).test(this.readyPhone) && this.readyPhone !== '') {
        this.showAlertTip = true
        this.alertContent = '备用电话格式不正确'
      } else {
        let userId = localStore.getStorage('user_id')
        let storeParams = {
          userId: userId,
          address: this.newAddress,
          address_detail: this.address,
          geohash: this.geohash,
          name: this.name,
          phone: this.phone,
          phone_bk: this.readyPhone,
          poi_type: '',
          sex: '男',
          tag: '',
          tag_type: ''
        }
        this.AFTER_ADDRESS(storeParams)
        homeApi.newHaveAddress(storeParams)
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.select-mess{
  padding: 20px;
  background: #fff;
  input{
    width: 100%;
    height: 70px;
    line-height: 68px;
    padding-left: 10px;
    border: 1px solid #ddd;/*no*/
    border-radius: 5px;
    background: #f2f2f2;
    margin-top: 20px;
  }
  button{
    width: 100%;
    height:  70px;
    margin-top: 40px;
    line-height: 70px;
    border-radius: 10px;
    font-size: 28px;
    color: #fff;
    text-align: center;
    background: #4cd964;
  }
}
</style>
