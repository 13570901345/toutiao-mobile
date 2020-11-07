<template>
  <div class="articlecontainer" >
    <van-cell-group>
      <van-cell class="box-contain" :to="{
        name:'article',
        params:{
          articleId:article.art_id
        }
      }"
      >
        <div slot="title" class="titlevalue">{{ article.title }}</div>
        <div slot="label">
          <div v-if="article.cover.type === 3" class="imageitem">
            <div
              v-for="(img, index) in article.cover.images"
              :key="index"
              class="imageindex"
            >
              <van-image class="vanimagethree" :src="img" fit="cover" />
            </div>
          </div>
          <div class="spanbox">
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }}评论</span>
            <span>{{ article.pubdate | datafilter}}</span>
          </div>
        </div>
        <van-image
          class="vanimageone"
          v-if="article.cover.type === 1"
          :src="article.cover.images[0]"
          fit="cover"
        />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'articlecontainer',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () { },
  methods: {}
}
</script>

<style lang="less" scoped>
.box-contain {
  .van-cell__title,
  .van-cell__value {
    flex: unset;
  }
  .titlevalue{
      font-size: 20px;
  }
  .spanbox{
      span{
          color: #b4b4b4;
          margin-right: 10px;
      }
  }
  .van-cell__title{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }
  .vanimageone {
    width: 80px;
    height: 80px;
    margin-left: 8px;
  }
  .imageitem {
    display: flex;
    padding: 10px 0;
    .imageindex {
      flex: 1;
      &:not(:last-child) {
        padding-right: 3px;
      }
      .vanimagethree {
        height: 80px;
      }
    }
  }
}
  /deep/ .van-cell {
      justify-content: space-between;
  }

</style>
