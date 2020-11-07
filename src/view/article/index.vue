<template>
  <div class="article-container" style="background: #fff">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="positionbox">
      <!-- 标题 -->
      <div class="container">{{ article.title }}</div>
      <!-- 标题 -->

      <!-- 用户栏 -->
      <van-cell :title="article.aut_name" center :border="false">
        <van-image slot="icon" class="iconimage" :src="article.aut_photo" round>
        </van-image>
        <div slot="label">{{ article.pubdate | datafilter }}</div>
        <van-button
          round
          :type="article.is_followed ? 'info' : ''"
          :icon="article.is_followed ? 'plus' : ''"
          class="buttonplus"
          @click="onchange"
          :loading="isload"
        >
          {{ article.is_followed ? "关注" : "已关注" }}
        </van-button>
      </van-cell>
      <!-- 用户栏 -->

      <!-- 文章内容栏 -->
      <div
        class="markdown-body tobody"
        v-html="article.content"
        ref="image-fit"
      ></div>

      <!-- 文章评论栏-->
      <commendlist :articleId="articleId" :listcommend="commend" @isshow="onreplace"/>
      <!-- /文章评论栏-->

      <!-- 文章内容栏 -->
    </div>

    <!-- 底部栏 -->
    <bottomnav :article="article" :articleId="articleId" @boxdata="onboxdata"/>
    <!-- 底部栏 -->

    <!-- 评论子组件 -->
     <van-popup
      v-model="isshow"
      closeable
      position="bottom"
      round
      :style="{ height: '85%' }"
      close-icon-position="top-left"
    >
    <minicommend :commend='item'/>

    </van-popup>
    <!-- 评论子组件 -->
  </div>
</template>

<script>
import minicommend from './compentend/minicommend'
import commendlist from './compentend/commendlist'
import './markdown.css'
import { getarticle } from '@/api/article'
import { ImagePreview } from 'vant'
import { deletefollow, getfollow } from '@/api/user'
import bottomnav from './compentend/bottomnav'
export default {
  name: 'articlecontainer',
  components: {
    bottomnav,
    commendlist,
    minicommend
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
    // targit: {
    //   type: [String, Number, Object],
    //   default: null
    // },
  },
  data () {
    return {
      article: {}, // 用来存储文章全部的信息
      isload: false,
      commend: [],
      isshow: false,
      item: []
    }
  },
  computed: {},
  watch: {
  },
  created () {
    this.ongetarticle()
  },
  mounted () {},
  methods: {
    async ongetarticle () {
      const { data } = await getarticle(this.articleId)
      // console.log(data);
      this.article = data.data
      this.$nextTick(() => {
        const dom = this.$refs['image-fit']
        const imgs = dom.querySelectorAll('img')
        // console.log(img);
        // 拿到img之后相对与可以进行操作来
        // 只有点击一下图片这进行预览操作
        const imagelist = []
        imgs.forEach((item, index) => {
          imagelist.push(item.src)
          //   console.log(imagelist);
          item.onclick = function () {
            ImagePreview({
              images: imagelist,
              startPosition: index
            })
          }
        })
      })
    },
    async onchange () {
      this.isload = true
      if (this.article.is_followed) {
        // 没关注正要关注
        await deletefollow(this.article.aut_id)
        // console.log(data);
      } else {
        await getfollow(this.article.aut_id)
        // console.log(data);
      }

      this.article.is_followed = !this.article.is_followed
      this.isload = false
    },

    onboxdata (data) {
      // console.log(data.new_obj);
      this.commend.unshift(data.new_obj)
    },
    onreplace (data) {
      // console.log(data);
      this.isshow = true
      this.item = data
      console.log(this.item)
    }
  }
}
</script>

<style lang="less" scoped>
.positionbox {
  position: fixed;
  top: 39.25px;
  left: 0;
  right: 0;
  bottom: 52px;
  overflow-y: auto;
  background-color: #fff;
}
/deep/ .app-nav-bar {
  background-color: #64b5e0;
  .van-nav-bar__title {
    color: #ffffffad;
  }
}
/deep/ .van-nav-bar .van-icon {
  color: #ffffffad;
}
.container {
  font-size: 22px;
  padding: 20px 20px;
  font-weight: bold;
}
.iconimage {
  width: 45px;
  height: 45px;
  margin-right: 8px;
}
.buttonplus {
  height: 40px;
  width: 90px;
}
.tobody {
  padding: 20px 15px;
}
</style>
