<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="vancellbox">
      <van-cell center :border="false" class="mysetone">
        <van-image
          class="mysetimage"
          slot="icon"
          round
          fit="cover"
          :src="currentuser.photo"
        />
        <div slot="title" class="mysetname">{{ currentuser.name }}</div>
        <van-button size="mini" slot="right-icon" class="mysetinfo" round to="/userprofile"
          >编辑资料</van-button
        >
      </van-cell>
      <van-grid :border="false" class="mysettwo">
        <van-grid-item class="mysettoutiao">
          <div slot="text" class="mysettitle">头条</div>
          <div slot="icon" class="mysetmath">{{ currentuser.art_count }}</div>
        </van-grid-item>
        <van-grid-item class="mysettoutiao">
          <div slot="text" class="mysettitle">关注</div>
          <div slot="icon" class="mysetmath">
            {{ currentuser.follow_count }}
          </div>
        </van-grid-item>
        <van-grid-item class="mysettoutiao">
          <div slot="text" class="mysettitle">粉丝</div>
          <div slot="icon" class="mysetmath">{{ currentuser.fans_count }}</div>
        </van-grid-item>
        <van-grid-item class="mysettoutiao">
          <div slot="text" class="mysettitle">获赞</div>
          <div slot="icon" class="mysetmath">{{ currentuser.like_count }}</div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div class="no-login" v-else @click="$router.push({
      name:'login',
      query:{
        redirect:$router.currentRoute.fullPath
      }
    })">
      <img src="./phone.png" class="nologinimage" />
      <div class="nologintitle">登录/注册</div>
    </div>

    <van-grid clickable :column-num="2" :border="false" class="mysetcenter">
      <van-grid-item icon="star-o" text="收藏" class="shouchang" />
      <van-grid-item icon="tosend" text="历史" class="lishi" />
    </van-grid>
    <div class="mysetnav">
      <van-cell title="消息通知" is-link url="/vant/mobile.html" />
      <van-cell title="小智同学" is-link to="/usercheat" />
    </div>
    <van-cell
      size="large"
      title="退出登录"
      v-if="user"
      @click="onnologin"
      class="tuichu"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getuser } from '@/api/user.js'
export default {
  name: 'mycontainer',
  components: {},
  props: {},
  data () {
    return {
      currentuser: {} // 用于获取当前对用户数据
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.ongetuser()
  },
  mounted () {},
  methods: {
    async ongetuser () {
      try {
        const { data } = await getuser()
        this.currentuser = data.data
      } catch (err) {
        console.log(err)
      }
    },
    onnologin () {
      this.$dialog
        .confirm({
          title: '退出登录提示',
          message: '确定退出登录吗'
        })
        .then(() => {
          this.$store.commit('getuser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.vancellbox {
  background: url("./banner.png") no-repeat;
  background-size: cover;
  .mysetone {
    background: unset;
    height: 116px;
    .mysetname {
      font-size: 15px;
      color: #fff;
      margin-left: 5px;
    }
    .mysetimage {
      width: 44px;
      height: 44px;
      border: 1px solid #fff;
      box-sizing: border-box;
    }
    .mysetinfo {
      height: 18px;
      color: #666666;
    }
  }
  .mysettwo {
    .mysettoutiao {
      color: #fff;
      .mysettitle {
        font-size: 16px;
      }
      .mysetmath {
        font-size: 20px;
      }
    }
  }
  /deep/ .van-grid-item__content {
    background: unset;
  }
}
.mysetcenter {
  .shouchang {
    color: #eb5253;
  }
  .lishi {
    color: #ff9d1d;
  }
}
.tuichu {
  text-align: center;
  color: #d86262;
}
.mysetnav {
  margin: 5px 0;
}

.no-login {
  background: url("./banner.png") no-repeat;
  height: 193px;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .nologinimage {
    width: 66px;
    height: 66px;
  }
  .nologintitle {
    font-size: 18px;
    color: #fff;
  }
}
</style>
