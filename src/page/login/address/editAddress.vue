<template>
  <div>
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <form class="select-mess">
      <div>
        <input type="text" placeholder="请填写你的姓名"/>
      </div>
      <div>
        <input type="text" placeholder="小区/写字楼/学校等" readonly @click="toSearchAddress" v-model="newAddress"/>
      </div>
      <div>
        <input type="text" placeholder="请填写详细送餐地址"/>
      </div>
      <div>
        <input type="text" placeholder="请填写能够联系到您的手机号"/>
      </div>
      <div>
        <input type="text" placeholder="备用联系电话（选填）"/>
      </div>
      <button>新增地址</button>
    </form>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      headTitle: '新增地址'
    }
  },
  computed: {
    ...mapState(['newAddress'])
  },
  components: {
    headTop
  },
  methods: {
    toSearchAddress () {
      this.$router.push({path: '/searchAddress'})
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
