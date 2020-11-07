<template>
  <div id="app">
    <!-- 路由出口 -->
    <keep-alive :include="cachedata">
      <router-view />
      </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cachedata'])
  }
}

</script>
<style lang="less">
</style>
