import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/login')
  },
  {
    path: '/',
    name:'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认子路由， 至能有1个
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path:'/qa',
        name:'qa',
        component: () => import('@/views/qa')
      },
      {
        path:'/video',
        name:'video',
        component: () => import('@/views/video')
      },
      {
        path:'/my',
        name:'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    // 动态路由
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true // 开启 props 传参 说白了就是把路由参数映射到组件的props数据中
  }
]

const router = new VueRouter({
  routes
})

export default router
