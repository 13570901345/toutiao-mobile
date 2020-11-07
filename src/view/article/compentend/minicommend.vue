<template>
  <div class="minicommend">
      <commendlist :listcommend='commend'/>
  </div>
</template>

<script>
import commendlist from './commendlist'
export default {
  name: 'minicommend',
  components: { commendlist },
  props: {
    commend: {
      type: [Array, Object, String]
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
