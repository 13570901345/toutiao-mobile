/**
 * 引用dayjs插件
 */
import Vue from 'vue'
import * as dayjs from 'dayjs'

import * as isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import 'dayjs/locale/zh-cn' // 导入本地化语言

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

dayjs.extend(isLeapYear) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言

Vue.filter('datafilter', function (value) {
  return dayjs(value).from(dayjs())
})
Vue.filter('datatime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
