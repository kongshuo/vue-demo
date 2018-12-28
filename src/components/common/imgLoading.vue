<template>
  <div class="img-loading">
    <div class="loading" :style="{backgroundPositionY:-positionY+'px'}"></div>
    <div class="shadow-circle"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      positionY: 0,
      timer: null
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      if (this.positionY === 600) {
        this.positionY = 0
      } else {
        this.positionY += 100
      }
    }, 600)
  },
  beforeDestory () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss">
@keyframes imgup{
    0%{transform: translateY(0)}
    50%{transform: translateY(-100px)}
    100%{transform: translateY(0)}
}
@keyframes scaleCircle{
  0%{width:60px;height:40px;}
  50%{width:80px;height:60px;}
  100%{width:60px;height:40px;}
}
.img-loading{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.loading{
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9;
  width: 200px;
  height: 200px;
  margin-top: -100px;
  margin-left: -100px;
  background:url('/static/icon_loading.png') center no-repeat;
  animation: imgup .6s infinite ease-in-out;
}
.shadow-circle{
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9;
  width: 60px;
  height: 40px;
  border-radius: 50%;
  margin-top: 100px;
  margin-left: -30px;
  transform: rotateX(60deg);
  background: #999;
  animation: scaleCircle .6s infinite ease-in-out;
}
</style>
