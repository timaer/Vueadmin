import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'
import { hasAuthLogin,doLogout} from '@/utils/auth.js'
Vue.use(Router)

export const constRoutes=[
  {
    path: '/login',
    name: 'login',
    title:'登陆页',
    icon:'user',
    hasChildren:false,
    component: () => import('@/page/login')
  },
  {
    path: '/',
    name: 'index',
    title:'首页',
    icon:'home',
    hasChildren:false,
    component: () => import('@/page/index')
  },
  {
    path: '/power',
    name: 'power',
    title:'权限管理',
    icon:'power',
    hasChildren:false,
    component: () => import('@/page/power')
  },
  {
    path: '/orderlist',
    name: 'orderlist',
    title:'订单列表',
    icon:'list2',
    hasChildren:false,
    component: () => import('@/page/orderlist')
  },
  {
    path: '/shop',
    name: 'shop',
    title:'店铺管理',
    icon:'shop',
    hasChildren:true,
    component: Layout, 
    children:[
      {
        path: '/addshop',
        name: 'addshop',
        title:'新增店铺',
        icon:'add',
        component: () => import('@/page/addshop') 
      },
      {
        path: '/editshop',
        name: 'editshop',
        title:'编辑店铺',
        icon:'edit',
        component: () => import('@/page/editshop') 
      },
      {
        path: '/shoplist',
        name: 'shoplist',
        title:'店铺列表',
        icon:'list',
        component: () => import('@/page/shoplist') 
      }
    ]
  },
  {
    path: '/goods',
    name: 'goods',
    title:'商品管理',
    icon:'goods',
    hasChildren:true,
    component: Layout, 
    children:[
      {
        path: '/addgoods',
        name: 'addgoods',
        title:'添加商品',
        icon:'add',
        component: () => import('@/page/addgoods') 
      },
      {
        path: '/goodslist',
        name: 'goodslist',
        title:'商品列表',
        icon:'list',
        component: () => import('@/page/goodslist') 
      }
    ]
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/page/404') 
  },{
      path: '*',
      redirect: '404'
  }
]

const router=new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes:constRoutes
})

router.beforeEach((to, from, next)=>{
      if(hasAuthLogin(to.name)){
          next()
      }else{
          doLogout()
          router.push({name:'login',replace:true}).catch(()=>{})
      }
})

export default router
