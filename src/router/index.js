import Vue from 'vue'
import VueRouter from 'vue-router'
import {userdata} from '@/common/utils'
import store from '@/store/index.js'
import { Toast } from 'vant';
// import axios from 'axios'
Vue.use(VueRouter)

const home=() => import('@/views/home')
const video=() => import('@/views/video')
const my=() => import('@/views/my')
const sheet=() => import('@/views/sheet')
const song=() => import('@/views/song')
const layout=()=>import('@/views/layout')
const logon=()=>import('@/views/login')
const search=()=>import('@/views/search')
const comment=()=>import('@/views/comment')
const floor=()=>import('@/views/floor')
const mysong=()=>import('@/views/mysong')
const routes = [
   {
	   path:'/',
	   component:layout,
     children:[
       {
        path:'',
        name:'home',
        component:home
       },
       {
        path:'/video',
        name:'video',
        component:video
       },
       {
           path:'/my',
           name:'my',
           component:my
       },
     ]
   },
   {
     path:'/sheet/:id',
     component:sheet,
     name:sheet
   },
   {
     path:'/song',
     component:song,
     name:song
   },
   {
    path:'/login',
    component:logon
   },
   {
    path:'/search',
    component:search
   },
   {
     path:'/comment/:id',
     component:comment,
     name:comment
   },
   {
    path:'/floor/:id',
    component:floor,
    name:floor
   },
   {
    path:'/mysong',
    component:mysong,
    name:mysong,
    meta: { requiredLogin: true }
   }
]


const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to, from, next) => {
  const { token,isLogin } = store.state
  const { requiredLogin } = to.meta
   if(!isLogin){
    if(token){
      //axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.state.isLogin=true
      userdata()
      next()
    }else{
      if(requiredLogin){
        Toast.fail('您还没有登录')
        router.push('/login')
      }else{
        next()
      }
    }
   }else{
    next()
   }
})

export default router
