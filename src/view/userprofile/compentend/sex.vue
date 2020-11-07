<template>
  <div class="sexcontainer">
    <van-picker
      title="选择性别"
      show-toolbar
      :defaultIndex="defaultIndex"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updataUserprofile } from '@/api/user'
export default {
  name: 'sexcontainer',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // onConfirm(value, index) {
    //   Toast(`当前值：${value}, 当前索引：${index}`);
    // },
    // onChange(picker, value, index) {
    //   Toast(`当前值：${value}, 当前索引：${index}`);
    // },
    // onCancel() {
    //   Toast("取消");
    // },
    async onConfirm (value, index) {
      // 封装接口 传送数值
    //   console.log(value, index);
      // 关闭窗口 渲染数值

      await updataUserprofile({
        gender: index
      })

      this.$emit('input', index)
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
