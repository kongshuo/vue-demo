<template>
  <section class="app">
    <head-top :isGoBack="true" :headTitle="headTitle" @callback="callback">
      <a href="javascript:;" slot="login" class="login right" @click="login" v-if="!isLogin">登录|注册</a>
      <a href="javascript:;" slot="login" class="login right" v-if="isLogin" @click="toProfile">
        <i class="iconfont icon-yonghu" style="color:#fff;font-size:18px;font-weight:bold;"></i>
      </a>
    </head-top>
    <section class="flex1"></section>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
import homeApi from '@/service/homeApi'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      headTitle: ''
    }
  },
  computed: {
    ...mapState(['isLogin', 'setUserInfo', 'geohash'])
  },
  components: {
    headTop
  },
  methods: {
    login () {
      this.$router.push({path: '/login'})
    },
    toProfile () {
      this.$router.push({path: '/profile'})
    },
    callback () {
      this.$router.push({path: '/home'})
    },
    getNowAddress () {
      let params = {geohash: this.$route.query.geohash}
      homeApi.getGeohashAddress(params).then(res => {
        this.headTitle = res.data.name
      })
    }
  },
  created () {
    this.getNowAddress()
  }
}
</script>
<style lang="scss" scoped>
.login{
    display: inline-block;
    height: 100%;
    padding: 0 20px;
    line-height: 90px;
    font-size: 28px;
    color: #fff;
  }
</style>
