import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store/'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/view/home/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/view/qa/'),
        meta: { requiresAuth: true }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/view/video/'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/view/my/'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/view/search'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/view/article/'),
    props: true,
    meta: { requiresAuth: false }
  },
  {
    path: '/userprofile',
    name: 'userprofile',
    component: () => import('@/view/userprofile'),
    meta: { requiresAuth: false }
  },
  {
    path: '/usercheat',
    name: 'usercheat',
    component: () => import('@/view/user-cheat'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 如果开启了守卫表示要登录才能访问
    // 首先要校验登录状态
    if (store.state.user) {
      return next()
    }
    Dialog.confirm({
      title: '确定登录没啊',
      message: '请登录再进行访问!'
    })
      .then(() => {
        // 如果确定了
        router.push({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => {
        // 点击取消了

      })
  } else {
    next()
  }
  // 如果用户未能验证身份，则 `next` 会被调用两次
})
export default router
