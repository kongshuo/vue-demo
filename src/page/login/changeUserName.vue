<template>
  <div>
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <div class="username">
      <input type="text" minlength="5" maxlength="24" placeholder="输入用户名" @input="inputThing" :class="{error:isError}" v-model.trim="username">
      <p v-if="!isError">用户名只能修改一次（5-24字符之间）</p>
      <p v-else :class="{errortip:isError}">用户名长度在5到24位之间</p>
      <button :class="{fontopacity:!isError}" v-on:click="resetUserName">确认修改</button>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      headTitle: '修改用户名',
      isError: false,
      username: ''
    }
  },
  computed: mapState({
    setUserInfo: 'setUserInfo'
  }),
  components: {
    headTop
  },
  methods: {
    ...mapMutations({
      SET_USERNAME: 'SET_USERNAME'
    }),
    resetUserName () {
      if (!this.username) {
        this.isError = true
        return false
      }
      this.SET_USERNAME(this.username)
      this.$router.go(-1)
    },
    // 监听input值的变化
    inputThing () {
      if (this.username.length < 5 || this.username.length > 24) {
        this.isError = true
      } else {
        this.isError = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.username{
  padding: 0 20px;
  input{
    width: 100%;
    height: 82px;
    line-height: 80px;
    margin-top: 20px;
    padding-left: 10px;
    border: 1px solid #ddd;/*no*/
    border-radius: 5px;
    font-size: 32px;
    color: #333;
    background: #fff;
  }
  .error{
    border-color: #ea3106;
  }
  p{
    padding: 20px 0 40px 0;
    font-size: 24px;
    color: #666;
  }
  .errortip{
    color: #ea3106;
  }
  button{
    width: 100%;
    height: 90px;
    border-radius: 10px;
    line-height: 90px;
    font-size: 32px;
    color: #fff;
    opacity: .6;
    text-align: center;
    background: #3199e8;
    transition: all 1s;
  }
  .fontopacity{
    opacity: 1;
  }
}
</style>
