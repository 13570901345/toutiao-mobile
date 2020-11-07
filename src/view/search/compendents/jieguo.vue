<template>
  <div class="jieguo">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'jieguo',
  components: {},
  props: {
    result: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [], // 数据渲染存储的地方
      loading: false, // 是否处于加载状态
      finished: false, // 是否加载完成
      page: 1, // 当前页数
      per_page: 10// 每页数据
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 获取搜索结果的接口并传递数据给他
      const { data } = await getSearch({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.result // 搜索关键字
      })
      //   console.log(data);
      // 得到数据并渲染到网页
      const { results } = data.data
      this.list.push(...results)
      // 关闭加载
      this.loading = false
      // 如果还有数据则再次加载 如果没有就结束
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
