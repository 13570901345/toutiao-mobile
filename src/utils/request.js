/**
 * 进行拦截器axios等配置
 */

import axios from 'axios'
import store from '@/store/index.js'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/'

const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn', // 配置基础路径

  transformResponse: [
    function (data) {
      // Do whatever you want to transform the data
      // console.log(data)

      // 后端返回的数据可能不是 JSON 格式字符串
      // 如果不是的话，那么 JSONbig.parse 调用就会报错
      // 所以我们使用 try-catch 来捕获异常，处理异常的发生
      try {
        // 如果转换成功，则直接把结果返回
        return JSONbig.parse(data)
      } catch (err) {
        console.log('转换失败', err)
        // 如果转换失败了，则进入这里
        // 我们在这里把数据原封不动的直接返回给请求使用
        return data
      }

      // axios 默认在内部使用 JSON.parse 来转换处理原始数据
      // return JSON.parse(data)
    }
  ]
})
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log(config);
    const { user } = store.state
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器
// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // console.log(error.response.status);
  const status = error.response.status
  if (status === 400) {
    Toast.fail('客户端请求参数异常')
  } else if (status === 401) {
    // 情况一 没有登录什么都没有
    const { user } = store.state
    // console.log(user)
    if (!user || !user.token) {
      // zhijie tiao zhuan denglu
      return redirectpath()
    }

    // 情况二 就是登录过期
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })

      user.token = data.data.token
      store.commit('getuser', user)
      // console.log(error.config);
      // 重新调用了一下request的那个
      return request(error.config)
    } catch (err) {
      console.log(err)
      redirectpath()
    }
  } else if (status === 403) {
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    Toast.fail('服务端异常，请稍后重试')
  }
  return Promise.reject(error)
})
function redirectpath () {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
export default request
