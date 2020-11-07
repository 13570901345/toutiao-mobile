<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="登录/注册"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="layoutheader"
    />
    <!-- 导航栏 -->

    <van-form
      :show-error="false"
      :show-error-message="false"
      @failed="onfailed"
      @submit="onsubmit"
      validate-first
      ref="loginname"
    >
      <van-field
        v-model="user.mobile"
        left-icon="phone-o"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formrules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        center
        left-icon="coupon-o"
        name="code"
        placeholder="请输入验证码"
        :rules="formrules.code"
      >
        <template #button>
          <van-count-down
            v-if="ishidden"
            :time="1000 * 60"
            format="ss s"
            @finish="ishidden = fales"
          />
          <van-button
            v-else
            size="mini"
            round
            type="primary"
            class="yanzhengma"
            @click.prevent="onsubsay"
            :loading="isloading"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="v-loginbox">
        <van-button type="info" size="large" class="loginbox">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userlogin, getcode } from '@/api/user'
// 引入提示小组件
// import { Toast } from "vant";
export default {
  name: 'logincontainer',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '17090086870',
        code: '246810'
      },
      formrules: {
        mobile: [
          {
            required: true,
            message: '请填写手机号'
          },
          {
            pattern: /^1[3|5|7|9]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '请填写验证码'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isloading: false,
      ishidden: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onsubmit () {
      this.$toast.loading({
        message: '加载中...', // 提示文本
        forbidClick: true // 禁止点击背景
      })
      // 获取用户数据
      // 对用户数据进行验证
      // 获取接口并进行请求
      try {
        const res = await userlogin(this.user)
        // console.log(res);
        this.$toast.success('登录成功')
        // 进行登录成功的操作
        // 把后端传递过来的数据令牌获取的并传到vuex
        this.$store.commit('getuser', res.data.data)

        this.$store.commit('removecachedata', 'layout')

        this.$router.push(this.$route.query.redirect || '/')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('手机号或验证码错误')
      }

      // 跳转登录
    },
    onfailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    // 发送验证码
    async onsubsay () {
      // 只进行手机号的验证
      try {
        // 校验手机号
        await this.$refs.loginname.validate('mobile')
        // 进行按钮加载
        this.isloading = true
        // 校验成功进行发送
        await getcode(this.user.mobile)
        // 本来下面这行是放在下面的 但是现在因为发送不出去 所以放在这里
        this.ishidden = true
      } catch (err) {
        // 校验失败
        // console.log(err);
        // console.log(err.response);
        let message = ''
        if (err && err.response && err.response.status === 400) {
          message = '发送失败，请稍后重试'
        } else if (err.name && err.name === 'mobile') {
          message = err.message
        } else {
          message = '发生未知错误'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 关闭加载的loading
      this.isloading = false
      // 验证通过和不通过
      // 通过后就可以调用接口
      // 进行倒计时
    }
  }
}
</script>

<style lang="less" scoped>
.v-loginbox {
  display: block;
  padding: 26px 8px;
  .loginbox {
    font-size: 18px;
  }
}
.yanzhengma {
    width: 100px;
    height: 23px;
    font-size: 8px !important;
  background-color: #ededed;
  border: none;
  color: #666666;
}
</style>
