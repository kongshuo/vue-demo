<template>
  <div>
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <router-link class="new-address" :to="{path:'/editAddress'}">
      新增地址
      <i class="iconfont icon-jinru right"></i>
    </router-link>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
export default {
  data () {
    return {
      headTitle: '编辑地址'
    }
  },
  components: {
    headTop
  }
}
</script>
<style lang="scss" scoped>
.new-address{
  display: block;
  height: 90px;
  margin-top: 40px;
  padding: 0 20px;
  border-top: 1px solid #ddd;/*no*/
  border-bottom: 1px solid #ddd;/*no*/
  line-height: 88px;
  text-align: left;
  font-size: 28px;
  color: #666;
  background: #fff;
}
</style>
