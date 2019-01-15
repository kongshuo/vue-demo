<template>
  <footer class="footer">
    <ul>
      <router-link tag="li" :class="$route.path.indexOf('msite')!==-1? 'active':''" :to="{path:'/msite',query:{geohash:geohash}}">
        <span>
          <i class="iconfont icon-changyonglogo40"></i>
        </span>
        <span>外卖</span>
      </router-link>
      <router-link tag="li" :class="$route.path.indexOf('search')!==-1? 'active':''" :to="{path:'/search',query:{geohash:geohash}}">
        <span>
          <i class="iconfont icon-sousuo"></i>
        </span>
        <span>搜索</span>
     </router-link>
      <router-link tag="li" :class="$route.path.indexOf('order')!==-1? 'active':''" :to="{path:'/order'}">
        <span>
           <i class="iconfont icon-wodedingdan"></i>
        </span>
        <span>订单</span>
      </router-link>
       <router-link tag="li"  :class="$route.path.indexOf('profile')!==-1? 'active':''" :to="{path:'/profile'}">
        <span>
           <i class="iconfont icon-yonghu"></i>
        </span>
        <span>我的</span>
      </router-link>
    </ul>
  </footer>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed: mapState({
    geohash: 'geohash'
  })
}
</script>
<style lang="scss" scoped>
.footer{
  border-top: 2px solid #e4e4e4;
  background-color: #fff;
  ul{
    height:90px;
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    li{
      flex: 1;
      span{
        display: block;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        i{
          font-size: 28px;
          font-weight: bold;
        }
      }
    }
    .active{
      span{
        color: #3190e8;
        i{
          color: #3190e8;
        }
      }
    }
  }
}
</style>
