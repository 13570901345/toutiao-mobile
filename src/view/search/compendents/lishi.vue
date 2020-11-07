<template>
  <div class="lishi">
    <van-cell title="历史记录">
      <div v-if="ismaket">
        <span @click="$emit('alldelete',[])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="ismaket = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="ismaket = true"></van-icon>
    </van-cell>
    <van-cell
      v-for="(data, index) in historydata"
      :key="index"
      :title="data"
      @click="ondelete(data, index)"
    >
      <van-icon name="close" v-show="ismaket"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'lishi',
  components: {},
  props: {
    historydata: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      ismaket: false // 是否开启删除
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    ondelete (data, index) {
      // 如果处于编辑状态则进行删除操作
      if (this.ismaket) {
        this.historydata.splice(index, 1)
      } else {
        // 进行搜索操作
        this.$emit('search', data)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
