<template>
  <div class="search-container">
    <form>
      <van-search
        v-model="searchtext"
        shape="round"
        background="#559fea"
        placeholder="请输入搜索关键词"
        show-action
        @search="onsearch(searchtext)"
        @cancel="$router.back()"
        @focus="isresult = false"
      >
      </van-search>
    </form>
    <!-- 搜索结果 -->
    <jieguo v-if="isresult" :result="searchtext" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <jianyi v-else-if="searchtext" :result="searchtext" @search="onsearch" />
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <lishi v-else :historydata="searchHistories" @search="onsearch" @alldelete="searchHistories=$event"/>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import jianyi from './compendents/jianyi'
import jieguo from './compendents/jieguo'
import lishi from './compendents/lishi'
import { setItem, getItem } from '@/utils/store'
import { mapState } from 'vuex'
export default {
  name: 'searchcontainer',
  components: {
    jianyi,
    jieguo,
    lishi
  },
  props: {},
  data () {
    return {
      searchtext: '', // 搜索框内的值
      isresult: false, // 是否确定搜索结果
      searchHistories: getItem('search-history') || [] // 用来存储历史记录的
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    searchHistories: {
      handler () {
        setItem('search-history', this.searchHistories)
      }
    }
  },
  created () {
    // this.ongethistorydata();
  },
  mounted () {},
  methods: {
    onsearch (text) {
      if (text) {
        this.searchtext = text

        // 存储搜索历史记录
        // 要求：不要有重复历史记录、最新的排在最前面
        const index = this.searchHistories.indexOf(text)
        if (index !== -1) {
          this.searchHistories.splice(index, 1)
        }
        this.searchHistories.unshift(text)

        setItem('search-history', this.searchHistories)
        // 打开搜索结果的组件其他关闭
        this.isresult = true
      } else {

      }
    }

    // async ongethistorydata() {
    //   let localhistory = getItem("search-history") || [];
    //   if (this.user) {
    //     const { data } = await getSearchhistory();
    //     // console.log(data);
    //     localhistory = [...new Set([...data.data.keywords, ...localhistory])];
    //   }
    //   this.searchHistories = localhistory;
    // },
  }
}
</script>

<style lang="less" scoped>
.van-search__action {
  color: #fff;
}
</style>
