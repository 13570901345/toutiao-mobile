<template>
  <div class="namenav">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close-popup')"
      @click-right="onmarketname"
    />
    <div class="fff">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
      round
    />

    </div>
  </div>
</template>

<script>
import { updataUserprofile } from '@/api/user'
export default {
  name: 'namenav',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value// 内容
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onmarketname () {
      // 封装请求接口
      // 发送请求 关闭窗口
      updataUserprofile({
        name: this.message
      })
      this.$emit('input', this.message)
      this.$emit('close-popup')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__title {
    color: #646566 !important;
}
.fff {
    padding: 10px 10px;
}
</style>
