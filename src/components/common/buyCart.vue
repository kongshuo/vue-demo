<template>
  <section class="buyCart">
    <section class="cart">
      <section>
        <i class="iconfont icon-gouwuche"></i>
        <span>12</span>
      </section>
    </section>
    <section class="total-money">
      <p>￥0.00</p>
      <p>配送费￥1</p>
    </section>
    <section class="start-money">还差￥15元起送</section>
  </section>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.buyCart{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 90px;
  background:#3d3d3f;
}
.cart{
  position: absolute;
  left: 20px;
  top: -40px;
  z-index: 10;
  width: 110px;
  height: 110px;
  padding: 10px;
  line-height: 110px;
  border-radius: 100%;
  box-shadow: 0 0 5px #888888;
  background: #3d3d3f;
  text-align: center;
  section{
    width: 100%;
    height: 100%;
    line-height: 90px;
    border-radius: 100%;
    background: #3d3d3f;
    // background: #3190e8;
  }
  i{
    font-size: 60px;
    color: #fff;
  }
  span{
    position: absolute;
    top: -15px;
    right: -5px;
    height: 40px;
    line-height: 40px;
    padding: 0 5px;
    border-radius: 100%;
    color: #fff;
    background: #ff461d;
  }
}
.total-money{
  padding: 0 300px 0 150px;
  height: 90px;
  p{
    color: #fff;
  }
  p:nth-of-type(1){
    line-height: 50px;
    font-size: 36px;
    font-weight: bold;
  }
  p:nth-of-type(2){
    line-height: 40px;
    font-size: 24px;
  }
}
.start-money{
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  padding: 0 20px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  background: #535356;
}
</style>
