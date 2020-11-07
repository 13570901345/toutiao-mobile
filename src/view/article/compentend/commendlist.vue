<template>
  <div class="commendlist markdown-body">
    <div class="pinglun">全部评论</div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="ongetComments"
    >
      <van-cell
        v-for="(commend, index) in listcommend"
        :key="index"
        class="vancellbox"
      >
        <van-image
          width="30"
          height="30"
          :src="commend.aut_photo"
          slot="icon"
          round
          fit="cover"
        />
        <div slot="title" style="color: #3685d6">
          {{ commend.aut_name }}
        </div>
        <div slot="label">
          <div class="commendcontent">{{ commend.content }}</div>
          <div>
            <span>{{ commend.pubdate | datatime("MM-DD HH:mm") }}</span>
            <van-button size="mini" round class="buttonbox" @click="$emit('isshow',commend)"
              >回复{{ commend.reply_count }}</van-button
            >
          </div>
        </div>
        <div class="aaaa">
          <van-icon
            :name="commend.is_liking ? 'good-job' : 'good-job-o'"
            :color="commend.is_liking ? 'red' : '#777'"
            @click="onchangelike(commend)"
          >
            <span v-html="commend.like_count === 1 ? nub : commend.like_count">
            </span>
          </van-icon>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import bs from '@/utils/midden'
import { getComments, addCommentLike, deleteCommentLike } from '@/api/commend'
export default {
  name: 'commendlist',
  components: {

  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    },
    listcommend: {
      type: [Array, Object],
      default: () => []
    }
  },
  data () {
    return {
      offset: null, // 评论偏移量
      totalcount: null, // 总数据条数
      loading: false, // 是否处于加载状态
      finished: false, // 是否加载完成
      nub: 1,
      show: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.ongetComments()
  },
  mounted () {},
  methods: {
    async ongetComments () {
      const { data } = await getComments({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleId.toString(), // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 10 // 每页大小
      })
      // console.log(data);
      // 把数据渲染到了上面
      const { results } = data.data
      // console.log(results);
      this.listcommend.push(...results)
      this.offset = data.data.last_id
      // 然后关闭加载状态
      this.loading = false
      // 如果还有数据则继续请求数据如果没有则停止
      if (results.length) {
        this.offset = data.data.last_id
      } else this.finished = true
      bs.$emit('commendcount', data.data.total_count)

      bs.$emit('commendlist', this.listcommend)
    },

    async onchangelike (commend) {
      const commendid = commend.com_id.toString()
      if (commend.is_liking) {
        // 如果以点击则取消点击并减1
        await deleteCommentLike(commendid)
        this.$nextTick(() => {
          // DOM 更新了
          commend.like_count--
        })
      } else {
        // 如果没有点击 这点击加1

        await addCommentLike(commendid)
        this.$nextTick(() => {
          // DOM 更新了
          commend.like_count++
        })
      }
      commend.is_liking = !commend.is_liking
    },

    ontickopen () {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.commendlist {
  padding: 20px 10px;
  .pinglun {
    margin: 10px 0 20px 10px;
  }
}
.vancellbox {
  width: 100%;
  height: 100px;
}
.van-dabig {
  width: 200px;
}
/deep/ .van-cell__title,
.van-cell__value {
  flex: unset;
}
.van-cell__title {
  width: 6.81333rem;
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.commendcontent {
  padding-bottom: 10px;
  color: #000;
}
.buttonbox {
  margin-left: 8px;
}
.aaaa {
  display: flex;
  width: 33px;
}
</style>
