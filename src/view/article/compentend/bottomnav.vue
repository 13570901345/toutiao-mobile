<template>
  <div class="bottom-nav">
    <van-button round class="commendwrite" @click="onscroll">写评论</van-button>
    <div class="allicon">
      <van-icon name="comment-o" color="#777" :badge="mate"></van-icon>
      <van-icon
        :name="article.is_collected ? 'star' : 'star-o'"
        :color="article.is_collected ? '#fbca13' : ''"
        @click="oncollect"
      ></van-icon>
      <van-icon
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude === 1 ? '#da5353' : ''"
        @click="onlike"
      ></van-icon>
      <van-icon name="share" color="#777"></van-icon>
    </div>

    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      round
      :style="{ height: '30%' }"
      class="popupwan"
    >
      <van-field
        v-model.trim="message"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入评论"
        show-word-limit
        size="large"
        label-width="40"
        round
        class="textareavan"
      />
      <van-button class="buttonhxk" @click="onpostcommend" :disabled="!message">发布</van-button>
    </van-popup>
    <!-- 弹出层 -->

  </div>
</template>

<script>
import bs from '@/utils/midden'
import { getcollect, deletecollect } from '@/api/user'
import { addLike, deleteLike } from '@/api/article'
import { addComment } from '@/api/commend'
export default {
  name: 'bottomnav',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      show: false,
      message: '',
      target: null,
      mate: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    bs.$on('commendlist', (data) => {
      this.target = data
    })
    bs.$on('commendcount', (data) => {
      this.mate = data
    })
  },
  methods: {
    async oncollect () {
      if (this.article.is_collected) {
        // 如果是收藏了的状态
        await deletecollect(this.article.art_id)
      } else {
        await getcollect(this.article.art_id)
      }
      this.article.is_collected = !this.article.is_collected
    },
    async onlike () {
      //   if (this.article.attitude === 1) {
      //     //如果是点赞状态
      //     await deleteLike(this.article.art_id);
      //     this.article.attitude = -1;
      //   } else {
      //     await addLike(this.article.art_id);
      //     this.article.attitude = 1;
      //   }
      try {
        // 如果已经点赞，则取消点赞
        if (this.article.attitude === 1) {
          await deleteLike(this.articleId)
          this.article.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          // 否则添加点赞
          await addLike(this.articleId)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    onscroll () {
      this.show = true
    },
    async onpostcommend () {
      const { data } = await addComment({
        target: this.articleId.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
        content: this.message,
        art_id: this.articleId // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数
      })
      // console.log(data);
      this.$emit('boxdata', data.data)
      this.show = false
      this.message = ''
      this.mate++
    }
  }
}
</script>

<style lang="less" scoped>
.bottom-nav {
  display: flex;
  align-items: center;
  padding: 10px 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  .commendwrite {
    width: 200px;
    height: 40px;
    margin-right: 5px;
    color: #777;
  }
  .allicon {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    /deep/.van-icon-comment-o::before {
      padding-top: 3px;
    }
  }
}
.popupwan {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  .textareavan {
    background-color: #f7f8fa;
    height: 145px;
    border-radius: 10%;
  }
  .buttonhxk {
    border: none;
    width: 57px;
    height: 145px;
    background-color: #fff;
    margin-left: 5px;
    border-radius: 10%;
  }
}
/deep/ .van-field__control {
  height: 100px !important;
}
</style>
