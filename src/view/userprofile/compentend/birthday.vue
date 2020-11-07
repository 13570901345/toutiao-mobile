<template>
  <div class="birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('closedata')"
      @confirm="onconfirm"
    />
  </div>
</template>

<script>
import { updataUserprofile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'birthday',
  components: {},
  props: {
    value: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 1, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onconfirm (value) {
      const aaa = dayjs(value).format('YYYY-MM-DD')
      await updataUserprofile({
        birthday: aaa
      })

      this.$emit('input', aaa)
      this.$emit('closedata')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
