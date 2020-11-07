<template>
  <div class="popuplist">
    <van-cell class="mainbox" :border="false">
      <div slot="title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isclass = !isclass"
        class="bianji"
      >
        {{ isclass ? "完成" : "编辑" }}
      </van-button>
    </van-cell>
    <van-grid :border="false" :gutter="10" class="gridfirst">
      <van-grid-item
        v-for="(channel, index) in channeluser"
        :text="channel.name"
        :key="index"
        class="gridbox"
        :class="{active:index === active}"
        @click="onclose(channel,index)"
      >
        <van-icon
          v-if="index !== 0"
          :name="isclass ? 'close' : ''"
          slot="icon"
          class="iconbox"
        />
      </van-grid-item>
    </van-grid>

    <van-cell class="mainbox editbox" :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid :border="false" :gutter="10" class="">
      <van-grid-item
        v-for="(item, index) in rescommend"
        :text="item.name"
        :key="index"
        @click="onchange(item)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getallchannels, setuserchannels, deleteUserChannel } from '@/api/user'
import { mapState } from 'vuex'
import { setItem } from '@/utils/store'
export default {
  name: 'poluplish',
  components: {},
  props: {
    channeluser: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      channalall: [], // 用来存储所以频道数据
      ishxk: false, // 用来确定是否添加到我到频道
      isclass: false // 用来判断是否切换编辑状态
    }
  },
  computed: {
    // 引入vuex
    ...mapState(['user']),
    // 计算推荐频道的数据是多少
    rescommend () {
      return this.channalall.filter((channel) => {
        return !this.channeluser.find((userchannel) => {
          return userchannel.id === channel.id
        })
      })
    }
  },
  watch: {},
  created () {
    this.ongetallchannels()
  },
  mounted () {},
  methods: {
    // 进行编辑删除操作切换操作
    async onclose (channel, index) {
      // console.log(channel,index);
      if (this.isclass) {
        // 编辑状态
        // 删除操作
        // 用户交互部分
        if (index === 0) {
          return
        }
        if (index <= this.active) {
          this.$emit('changenav', this.active - 1)
        }
        this.channeluser.splice(index, 1)
        // 数据部分
        if (this.user) {
          // 登录状态
          await deleteUserChannel(channel.id)
        } else {
          setItem('user-channel', this.channeluser)
        }
      } else {
        // 普通状态
        // 进行切换操作
        // 切换频道
        this.$emit('changenav', index)

        // 关闭弹窗
        this.$emit('close')
      }
    },
    // 进行添加操作
    async onchange (channel) {
      this.channeluser.push(channel)
      // 但是刷新之后没有持久性
      // 数据持久性需要调用接口或是进行本地存储
      if (this.user) {
        // 进行登录的存储操作
        await setuserchannels([{
          id: channel.id, // 频道 id
          seq: this.channeluser.length // 频道的 序号
        }])
      } else {
        // 没有登录进行本地存储的操作
        setItem('user-channel', this.channeluser)
      }
    },
    async ongetallchannels () {
      const { data } = await getallchannels()
      // console.log(data);
      this.channalall = data.data.channels
    }
  }
}
</script>

<style lang="less" scoped>
.editbox {
  padding-top: 40px;
}
.popuplist {
  padding-top: 54px;
  .mainbox {
    font-size: 16px;
    color: #333;
    .bianji {
      width: 50px;
    }
    .gridbox {
      width: 80px;
      height: 43px;
    }
  }
}
/deep/ .van-grid-item__content {
  background-color: #f4f5f6;
  .van-grid-item__text {
    font-size: 12px;
    color: #222;
  }
}
.gridfirst {
  position: relative;
  .iconbox {
    position: absolute;
    top: -23px;
    right: -46px;
  }
}
/deep/ .active {
  .van-grid-item__text {
    color: red !important;
  }
}
</style>
