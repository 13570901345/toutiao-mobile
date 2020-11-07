<template>
  <div class="user-cheat">
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
      class="boxone"
    />

    <van-cell title="单元格" value="内容" :border="false" class="cellbox" />

    <!-- <van-cell-group class="fieldbox" >
        <van-field v-model="text" />
    <van-button>发布</van-button>
    <van-cell-group> -->
    <van-cell-group class="fieldbox" center>
      <van-field v-model="message" placeholder="请输入用户名" />
      <van-button style="width: 67px; border: none">发布</van-button>
    </van-cell-group>
  </div>
</template>
<script>
import io from 'socket.io-client'

export default {
  name: 'usercheat',
  components: {},
  props: {},
  data () {
    return {
      message: '', // 输入框
      socket: null, //
      messages: []
    }
  },
  computed: {},
  watch: {},
  created () {
    const socket = io('http://ttapi.research.itcast.cn/')
    this.socket = socket
    socket.on('connect', function () {
      console.log('连接成功。。。')
    })
    socket.on('event', function (data) {})
    socket.on('disconnect', function () {
      console.log('断开连接')
    })
    socket.on('message', (data) => {
      console.log(data)
    })
  },
  mounted () {},
  methods: {
    onsent () {
      this.socket.emit('message', {
        msg: this.message,
        timestamp: Date.now()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.boxone {
  background-color: #4b8fd8;
}
/deep/ .van-nav-bar .van-icon {
  color: #f7f8fa;
}
/deep/ .van-nav-bar__title {
  color: #f7f8fa;
}
.cellbox {
  background: #ccc;
  position: fixed;
  top: 39px;
  right: 0;
  left: 0;
  bottom: 39px;
}
.fieldbox {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
}
</style>
