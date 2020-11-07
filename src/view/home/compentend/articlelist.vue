<template>
  <div class="articlevanlist" ref="articlevanlist">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onpullRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <articlecontainer v-for="(item, id) in articles" :key="id" :article="item"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getarticlelist } from '@/api/article'
import articlecontainer from '@/components/articlecontainer.vue'
export default {
  name: 'articlelist',
  components: {
    articlecontainer
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [], // 存储数据
      loading: false, // 是否处于加载 状态
      finished: false, // 是否加载完成
      nowtimestamp: null, // 时间戳的存储
      isRefreshLoading: false,
      scroll: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    const articlelist = this.$refs.articlevanlist
    articlelist.onscroll = () => {
      this.scroll = articlelist.scrollTop
    }
  },
  activated () {
    this.$refs.articlevanlist.scrollTop = this.scroll
  },
  methods: {
    async onLoad () {
      // 调用接口进行渲染数据
      const { data } = await getarticlelist({
        channel_id: this.channel.id,
        timestamp: this.nowtimestamp || Date.now(), // 表示如果nowtimestamp为空则就用当前时间戳 如果不为则用新的
        with_top: 1
      })
      // console.log(data);
      // 把数据放到存储的盒子李
      const { results } = data.data
      // console.log(results);
      // this.list.push(...results)
      this.articles.push(...results)
      // console.log(this.articles);

      // 关闭加载正在进行
      this.loading = false

      //
      if (results.length) {
        this.nowtimestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    // 下拉刷新加载
    async onpullRefresh () {
      // 进行接口的调用
      const { data } = await getarticlelist({
        channel_id: this.channel.id,
        timestamp: Date.now(), // 表示如果nowtimestamp为空则就用当前时间戳 如果不为则用新的
        with_top: 1
      })
      // 接受传递过来的数据并传递到数组上面
      const { results } = data.data
      this.articles.unshift(...results)
      // 当刷新停止时关闭加载状态
      this.isRefreshLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.articlevanlist {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
</style>
