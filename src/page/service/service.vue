<template>
  <section class="app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <section class="flex1">
      <section class="online-service">
        <div>
          <a href="javascript:;">
            <i class="iconfont icon-zaixiankefu"></i>
            <span>在线客服</span>
          </a>
        </div>
        <div>
          <a href="javascript:;">
            <i class="iconfont icon-dianhua"></i>
            <span>在线客服</span>
          </a>
        </div>
      </section>
      <h4 class="question">热门问题</h4>
      <section class="service-list">
        <ul>
          <li class="list-item" v-for="(val,index) of questionTitleList" :key="index">{{val}}<i class="iconfont icon-jinru"></i></li>
        </ul>
      </section>
    </section>
  </section>
</template>
<script>
import headTop from '@/components/header/header'
import homeApi from '@/service/homeApi'
export default {
  data () {
    return {
      headTitle: '服务中心',
      questionTitleList: [],
      questionContentList: []
    }
  },
  components: {
    headTop
  },
  methods: {
    initData () {
      homeApi.getQuestions().then(res => {
        let questionKeys = Object.keys(res.data)
        questionKeys.forEach(item => {
          // 返回的数据字段无重复的，但是标题有重名的，同一个标题只保留第一个，其他的过滤掉
          let flag = false
          this.questionTitleList.forEach(content => {
            if (content === res.data[item]) {
              flag = true
            }
          })
          if (item.indexOf('Caption') !== -1 && !flag) {
            this.questionTitleList.push(res.data[item])
          }
        })
      })
    }
  },
  created () {
    this.initData()
  }
}
</script>
<style lang="scss" scoped>
.online-service{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  div{
    position: relative;
    height: 200px;
    flex:1;
    text-align: center;
    a{
      display: inline-block;
      margin-top: 50px;
      i{
        font-size: 48px;
        font-weight: bold;
      }
      .icon-zaixiankefu{
        color: rgb(238, 112, 10);
      }
      .icon-dianhua{
        color: rgb(10, 238, 29);
      }
      span{
        display: block;
        margin-top: 10px;
        font-size: 28px;
        color: #999;
      }
    }
  }
}
.question{
  height: 140px;
  line-height: 140px;
  padding: 0 20px;
  border-bottom: 1px solid #f5f5f5;/*no*/
  color: #333;
  font-size: 32px;
}
.service-list{
  padding: 0 20px;
  .list-item{
    height: 90px;
    line-height: 90px;
    border-bottom: 1px solid #f5f5f5;/*no*/
    font-size: 28px;
    color: #666;
    text-align: left;
    i{
      float: right;
      font-size: 28px;
    }
  }
}
</style>
