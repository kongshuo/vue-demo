<template>
  <div class="profile-box app">
    <head-top :isGoBack="true" :headTitle="headTitle"></head-top>
    <div class="flex1">
       <div class="profile">
        <a href="javascript:;">
          <div class="userImg-box">
            <img src="@/assets/default.jpg" alt="">
          </div>
          <div class="profile-mess">
            <p>{{userName}}</p>
            <p>{{userMobile}}</p>
          </div>
          <div class="jinru">
            <i class="iconfont icon-jinru"></i>
          </div>
        </a>
      </div>
      <div class="profile-module">
        <ul>
          <li>
            <p><span class="yellow">0.00</span>元</p>
            <p>我的余额</p>
          </li>
          <li>
            <p><span class="red">3</span>个</p>
            <p>我的优惠</p>
          </li>
          <li>
            <p><span class="green">0</span>分</p>
            <p>我的积分</p>
          </li>
        </ul>
      </div>
      <div class="profile-other-module">
        <ul>
          <li>
            <span class="iconfont icon-wodedingdan"></span>
            我的订单
            <i class="iconfont icon-jinru"></i>
          </li>
          <li>
            <span class="iconfont icon-jifenshangcheng"></span>
            积分商城
            <i class="iconfont icon-jinru"></i>
          </li>
          <li>
            <span class="iconfont icon-huiyuan"></span>
            饿了么会员卡
            <i class="iconfont icon-jinru"></i>
          </li>
        </ul>
      </div>
      <div class="profile-other-module">
        <ul>
          <li>
            <span class="iconfont icon-fuwu"></span>
            服务中心
            <i class="iconfont icon-jinru"></i>
          </li>
          <li>
            <span class="iconfont icon-changyonglogo40"></span>
            下载饿了么app
            <i class="iconfont icon-jinru"></i>
          </li>
        </ul>
      </div>
    </div>
    <foot-bottom></foot-bottom>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
import footBottom from '@/components/footer/footer'
import localStorageApi from '@/config/localStore'
import loginApi from '@/service/loginApi'
export default {
  data () {
    return {
      headTitle: '个人中心',
      userName: null, // 用户名
      userMobile: null, // 用户绑定手机号
      myMoney: null, // 我的余额
      myDiscount: null, // 我的优惠
      myPoints: null// 我的积分
    }
  },
  components: {
    headTop,
    footBottom
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      if (localStorageApi.getStorage('user_id')) {
        let userId = localStorageApi.getStorage('user_id')
        loginApi.getUser(userId).then(res => {
          this.userName = res.data.username ? res.data.username : '未登录'
          this.userMobile = res.data.mobile ? res.data.mobile : '暂无手机绑定'
        })
      }
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
<style lang="scss" scoped>
.profile{
  a{
    position: relative;
    display: block;
    padding: 40px 170px;
    border-top: 1px solid #fff;/*no*/
    background-color: #3190e8;
  }
  .userImg-box{
    position: absolute;
    left: 40px;
    top: 50%;
    z-index: 9;
    margin-top: -50px;
    width: 100px;
    height: 100px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .profile-mess{
    p{
      line-height: 40px;
      font-size: 28px;
      color: #fff;
      font-weight: bold;
    }
  }
  .jinru{
    position: absolute;
    right: 20px;
    top:50%;
    margin-top: -10px;
    z-index: 9;
    i{
      font-size: 32px;
      color: #fff;
      font-weight: bold;
    }
  }
}
.profile-module{
    background-color: #fff;
    ul{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      li{
        flex: 1;
        padding: 30px 0;
        border-right: 1px solid #f1f1f1;/*no*/
        p{
          line-height: 40px;
          text-align: center;
          font-size: 24px;
          color: #666;
          span{
            font-size: 36px;
            font-weight: bold;
          }
          .yellow{
            color: #f90;
          }
          .red{
            color: #ff5f3e;
          }
          .green{
            color: #6ac20b;
          }
        }
      }
    }
  }
  .profile-other-module{
    margin-top: 20px;
    background-color: #fff;
    li{
      height:100px;
      line-height: 80px;
      padding:10px 20px 10px 50px;
      font-size: 28px;
      border-top:1px solid #f3f3f3;/*no*/
        span{
          font-size: 32px;
        }
       .icon-jifenshangcheng{
          color: rgb(219, 90, 90)
        }
        .icon-huiyuan{
          color: rgb(241, 239, 104)
        }
        .icon-fuwu{
          color: rgb(119, 109, 201)
        }
        .icon-changyonglogo40{
          color: rgb(67, 211, 247)
        }
        i{
          float: right;
        }
      }
  }
</style>
