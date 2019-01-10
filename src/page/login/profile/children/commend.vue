<template>
  <div class="app">
    <header-top :isGoBack="true" :headTitle="headTitle"></header-top>
    <section class="flex1">
      <section class="banner">
        <img src="/static/img/activity.png" alt="banner">
      </section>
      <section class="invate">
        <ul>
          <li>
            <img src="/static/img/weixin.png" alt="">
            <p>邀请微信好友</p>
          </li>
          <li>
            <img src="/static/img/qq.png" alt="">
            <p>邀请QQ好友</p>
          </li>
          <li>
            <img src="/static/img/fenxiang.png" alt="">
            <p>面对面邀请</p>
          </li>
        </ul>
      </section>
      <section class="invate-content">
        <div>
          <p>累计收益</p>
          <p><span>0</span>元</p>
        </div>
        <div>
          <p>成功邀请</p>
          <p><span>0</span>人</p>
        </div>
      </section>
      <section class="earn-detail">
        <p>-收益明细-</p>
        <div>
          <img src="/static/img/qianbao.png" alt="">
          <p>还不赶紧去邀请好友</p>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
import headerTop from '@/components/header/header'
export default {
  data () {
    return {
      headTitle: '推荐有奖'
    }
  },
  components: {
    headerTop
  }
}
</script>
<style lang="scss" scoped>
.banner{
  img{
    width: 100%;
  }
}
.invate{
  padding:40px 0;
  background: #fff;
  ul{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    li{
      flex: 1;
      text-align: center;
      img{
        width: 120px;
        height: 120px;
      }
      p{
        padding: 10px 0;
        font-size: 24px;
        color: #666;
      }
    }
  }
}
.invate-content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    div{
      flex: 1;
      p{
        line-height: 50px;
        font-size: 28px;
        color: #666;
        text-align: center;
        span{
          font-size: 36px;
          color: red;
          font-weight: bold;
        }
      }
    }
}
.earn-detail{
  margin-top: 40px;
  text-align: center;
  div{
    margin-top: 60px;
  }
  img{
    width: 60px;
  }
  p{
    line-height: 40px;
    color: #666;
  }
}
</style>
