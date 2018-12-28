<template>
  <div class="benefit app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <img-load></img-load>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import imgLoad from '@/components/common/imgLoading'
export default {
  data () {
    return {
      headTitle: '我的优惠',
      loadShow: true
    }
  },
  components: {
    headTop,
    imgLoad
  }
}
</script>
