<template>
  <div class="app">
    <header-top :isGoBack="true" :headTitle="headTitle"></header-top>
    <div class="flex1">
       <section class="enevlope-list">
          <ul>
            <li class="clearfix" v-for="item of hbHistoryList" :key="item.id">
              <div class="list-content">
                <div class="item-left">
                  <p>￥<span>{{String(item.amount).split('.')[0]}}</span>.<span>{{String(item.amount).split('.')[1] || 0}}</span></p>
                  <p>{{item.description_map.sum_condition}}</p>
                </div>
                <div class="item-right">
                  <div class="item-child-left">
                    <h4>{{item.name}}</h4>
                    <p>{{item.description_map.validity_periods}}</p>
                    <p>{{item.description_map.phone}}</p>
                  </div>
                  <!-- <div class="item-child-right">{{item.description_map.validity_delta}}</div> -->
                  <div class="item-child-right">已过期</div>
                </div>
              </div>
              <div class="description" v-if="item.limit_map">
                <p>{{item.limit_map.restaurant_flavor_ids}}</p>
              </div>
            </li>
          </ul>
        </section>
    </div>
  </div>
</template>
<script>
import headerTop from '@/components/header/header'
import homeApi from '@/service/homeApi'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      headTitle: '红包历史',
      hbHistoryList: []
    }
  },
  components: {
    headerTop
  },
  computed: {
    ...mapState([
      'setUserInfo'
    ])
  },
  methods: {
    initData () {
      if (this.setUserInfo.user_id) {
        let params = {id: this.setUserInfo.user_id}
        homeApi.getHbHistory(params).then(res => {
          this.hbHistoryList = res.data
        })
      }
    }
  },
  created () {
    this.initData()
  }
}
</script>
<style lang="scss" scoped>
.enevlope-list{
  padding: 20px;
  li{
    padding: 40px 20px;
    margin-bottom: 20px;
    background: #fff url('/static/img/expired.png') left top repeat-x;
    background-size:20px 10px;
    .list-content{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
.item-left{
  width: 160px;
  border-right: 1px dashed #ddd;/*no*/
  p:nth-of-type(1){
    font-size: 28px;
    font-weight: bold;
    color: #999;
    span{
      color: #999;
      font-weight: bold;
    }
    span:nth-of-type(1){
      font-size: 52px;
    }
  }
  p:nth-of-type(2){
    line-height: 40px;
    font-size: 24px;
    color: #999;
  }
}
.item-right{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  padding-left: 20px;
}
.item-child-left{
  flex: 1;
  h4{
    font-size: 28px;
    color: #666;
  }
  p{
    font-size: 24px;
    color: #666;
  }
}
.item-child-right{
  width:110px;
  font-size: 32px;
  font-weight: bold;
  color: #999;
}
.description p{
    font-size: 24px;
    color: #999;
    margin-top: 10px;
}
</style>
