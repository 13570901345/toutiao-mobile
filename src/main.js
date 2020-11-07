import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入amfe组件
import 'amfe-flexible'

// 引入公共样式表
import '@/style/index.less'

// 引入dayjs插件
import '@/utils/dayjs'
// 注册vant组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
