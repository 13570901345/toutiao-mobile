/**
 * 用来把px自动转化成rem 对配置文件
 */
module.exports = {
  // 插件
  plugins: {
    //     //自动刷新
    //   'autoprefixer': {
    //       //浏览器设置
    //     browsers: ['Android >= 4.0', 'iOS >= 8']
    //   },
    'postcss-pxtorem': {
      // 如果你使用的是基于 lib-flexable 的 REM 适配方案，则应该设置为你的设计稿的十分之一。
      // 例如设计稿是 750 宽，则应该设置为 75。
      // 大多数设计稿的原型都是以 iPhone 6 为原型，iPhone 6 设备的宽是 750，我们的设计稿也是这样。
      // 但是 Vant 建议设置为 37.5，为什么呢？
      // 因为 Vant 是基于逻辑像素 375 写的，所以如果你设置为 75 的话，Vant 的样式就小了一半。
      // 所以就在ps上进行修改即可
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
