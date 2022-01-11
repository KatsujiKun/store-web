/**
 * @author katsuji
 * @time 2022-01-04
 * @description 路由页面
 */

import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const VueRouterReplace = Router.prototype.replace
Router.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

Vue.use(Router)

const Login = () => import('../pages/login')

// 引入首页模块
const Home = () => import('../pages/home')
const MyHome = () => import('../pages/home/home.vue')

// 引入用户模块子路由
const UserList = () => import('../pages/user/list')
const UserAdd = () => import('../pages/user/add')
const UserEdit = () => import('../pages/user/edit')
const UserRole = () => import('../pages/user/role')
const UserAddress = () => import('../pages/user/address')

// 引入商品模块
const ProductList = () => import('../pages/product/list')

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, meta: { isLogin: true } },
    {
      path: '/index',
      component: Home,
      children: [
        { path: '/', redirect: '/home' },
        {
          path: '/home',
          component: MyHome,
          children: [
            // 用户子路由
            { path: '/user/list', component: UserList },
            { path: '/user/add', component: UserAdd },
            { path: '/user/edit', component: UserEdit },
            { path: '/user/role', component: UserRole },
            { path: '/user/address', component: UserAddress },
            // 商品子路由
            { path: '/product/list', component: ProductList }
          ]
        }
      ]
    }
  ]
})

router.beforeEach(function (to, from, next) {
  if (to.meta.isLogin) {
    next()
  } else {
    const token = store.getters['common/token']
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
