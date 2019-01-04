<template>
  <div class="alertTip-box" v-if="showAlertTip">
      <div class="alertTip">
        <div class="alert-logo">
          <span></span>
          <span></span>
        </div>
        <section class="alert-content">{{alertContent}}</section>
        <button class="confirm-btn" @click="confirm">确定</button>
      </div>
  </div>
</template>
<script>
export default {
  /**
   *  props参数:
   *  showAlertTip:boolean,控制提示层显示
   *  alertContent:string,提示内容
   */
  props: ['showAlertTip', 'alertContent'],
  methods: {
    confirm () {
      this.$emit('update:showAlertTip', false)
      this.$emit('callback')
    }
  }
}
</script>
<style lang="scss" scoped>
.alertTip-box{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(3,3,3,.5);
}
.alertTip{
  position: absolute;
  top:50%;
  left:50%;
  margin-left: -250px;
  margin-top:-250px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 500px;
  border-radius: 5px;
  background-color: #fff;
}
.alert-logo{
  position: relative;
  display: inline-block;
  width: 120px;
  height: 120px;
  border: 4px solid #f8cb86;
  border-radius: 50%;
  margin-top: 40px;
  span:nth-of-type(1){
    position: absolute;
    left: 50%;
    top:15%;
    margin-left: -3px;
    width: 6px;
    height: 50%;
    background-color: #f8cb86;
  }
  span:nth-of-type(2){
    position: absolute;
    left: 50%;
    top:75%;
    margin-left: -3px;
    width: 6px;
    height: 6px;
    background-color: #f8cb86;
  }
}
.alert-content{
  width: 100%;
  margin-top: 40px;
  text-align: center;
  font-size: 32px;
  color: #333;
  font-weight: bold;
}
.confirm-btn{
  width: 100%;
  height: 80px;
  line-height: 80px;
  margin-top: 40px;
  border:0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  background-color: #4cd964;
}
</style>
