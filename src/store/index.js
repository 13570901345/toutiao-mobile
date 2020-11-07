import Vue from 'vue'
import Vuex from 'vuex'
// 引入本地存储接口
import { getItem, setItem } from '@/utils/store'

Vue.use(Vuex)
const hxk = 'hxk'
export default new Vuex.Store({
  state: {
    user: getItem(hxk),
    cachedata: ['layout']
  },
  mutations: {
    getuser (state, data) {
      state.user = data
      setItem(hxk, state.user)
    },
    // 添加缓存数据
    addcachedata (state, pagename) {
      // 如果他没有这个组件的缓存则进行添加
      if (!state.cachedata.includes(pagename)) {
        state.cachedata.push(pagename)
      }
    },
    removecachedata (state, pagename) {
      const index = state.cachedata.indexOf(pagename)
      if (index !== -1) {
        state.cachedata.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
