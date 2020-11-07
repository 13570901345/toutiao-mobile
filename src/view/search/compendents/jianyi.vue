<template>
  <div class="jianyi">
    <van-cell
      icon="search"
      v-for="(item, index) in suggessitem"
      :key="index"
      @click="$emit('search',item)"
    >
      <div slot="title" v-html="hightlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchsuggess } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'jianyi',
  components: {},
  props: {
    result: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggessitem: [] // 用来存储建议联想数据
    }
  },
  computed: {},
  watch: {
    result: {
      handler: debounce(async function () {
        const { data } = await getSearchsuggess(this.result)
        this.suggessitem = data.data.options
      }, 200),
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    hightlight (str) {
      return str.replace(
        new RegExp(this.result, 'gi'),
        `<span style="color:red;">${this.result}</span>`
      )
    }
  }
}
</script>

<style lang="less" scoped>
</style>
