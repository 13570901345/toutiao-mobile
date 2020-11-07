<template>
  <div class="home-container">
    <van-nav-bar class="navbox">
      <van-button
        size="small"
        type="info"
        round
        class="searchbox"
        icon="search"
        slot="title"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- tab栏 -->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <articlelist :channel="item" />
      </van-tab>
      <div slot="nav-right" class="one"></div>
      <div slot="nav-right" class="navright">
        <van-icon name="wap-nav" class="wapnav" @click="show = true" />
      </div>
    </van-tabs>
    <!-- tab栏 -->

    <!-- 弹出窗 -->
    <van-popup
      get-container="body"
      v-model="show"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <!-- 导入组件 -->
      <popuplist
        :channeluser="channels"
        @close="show = false"
        @changenav="active = $event"
        :active="active"
      />
    </van-popup>
    <!-- 弹出窗 -->
  </div>
</template>

<script>
import { getusernav } from '@/api/user.js'
import articlelist from './compentend/articlelist'
import popuplist from './compentend/popup'
import { mapState } from 'vuex'
import { getItem } from '@/utils/store'
export default {
  name: 'homecontainer',
  components: {
    articlelist,
    popuplist
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [], // 用来存储文章导航数据
      show: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.onloadnav()
  },
  mounted () {},
  methods: {
    async onloadnav () {
      let channel = []
      // 有两种情况一种是是未登录的，一种是已经登录的
      if (this.user) {
        const { data } = await getusernav()
        // console.log(data);
        channel = data.data.channels
      } else {
        // 这个是未登录的
        // 未登录分为两种情况一种是有本地数据的，一种为用默认数据的
        const localchannel = getItem('user-channel')
        if (localchannel) {
          channel = localchannel
        } else {
          const { data } = await getusernav()
          channel = data.data.channels
        }
      }
      this.channels = channel
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  .navbox {
    background: #3994ef;
    /deep/ .van-nav-bar__title {
      max-width: none;
    }
    .searchbox {
      width: 277px;
      height: 30px;
      border: none;
      background: #5babfb;
      color: #fff;
      font-size: 16px;
      .van-icon {
        font-size: 18px;
        color: #fff;
      }
    }
  }
  .channel-tabs {
    /deep/ .van-tab {
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background: #3296fa;
    }
  }
  .navright {
    position: fixed;
    right: 0px;
    height: 44px;
    line-height: 44px;
    width: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    background-color: #fff;
    z-index: 1;
  }
}

/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 20px;
  z-index: 1;
}
.one {
  width: 33px;
  flex-shrink: 0;
}
</style>
