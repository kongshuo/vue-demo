<template>
  <footer class="footer">
    <ul>
      <li>
        <span>
          <i class="iconfont icon-changyonglogo40"></i>
        </span>
        <span>外卖</span>
      </li>
      <li>
        <span>
          <i class="iconfont icon-sousuo"></i>
        </span>
        <span>搜索</span>
      </li>
      <li>
        <span>
           <i class="iconfont icon-wodedingdan"></i>
        </span>
        <span>订单</span>
      </li>
      <li :class="$route.path.indexOf('profile')!==-1? 'active':''">
        <span>
           <i class="iconfont icon-yonghu"></i>
        </span>
        <span>我的</span>
      </li>
    </ul>
  </footer>
</template>
<script>
export default {
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
