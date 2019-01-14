<template>
  <section class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <section class="flex1">
      <div class="mark-html" v-html="content"></div>
    </section>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
import showdown from 'showdown'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      headTitle: '',
      content: ''
    }
  },
  computed: {
    ...mapState(['questions'])
  },
  components: {
    headTop
  },
  methods: {
    getContent () {
      this.headTitle = this.questions['title']
      let converter = new showdown.Converter()
      this.content = converter.makeHtml(this.questions['detail'])
    }
  },
  created () {
    this.getContent()
  }
}
</script>
<style lang="scss" scoped>
.mark-html{
  padding: 20px;
}
</style>
