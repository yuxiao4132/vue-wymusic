import Vue from 'vue'
import VueRouter from 'vue-router'
import {userdata} from '@/common/utils'
import store from '@/store/index.js'
Vue.use(VueRouter)

const home=() => import('@/views/home')
const video=() => import('@/views/video')
const my=() => import('@/views/my')
const sheet=() => import('@/views/sheet')
const song=() => import('@/views/song')
const layout=()=>import('@/views/layout')
const logon=()=>import('@/views/login')
const search=()=>import('@/views/search')
const sheetcomment=()=>import('@/views/sheetcomment')
const songcomment=()=>import('@/views/songcomment')
const floor=()=>import('@/views/floor')
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
     path:'/song/:id',
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
     path:'/sheetcomment/:id',
     component:sheetcomment,
     name:sheetcomment
   },
   {
    path:'/songcomment/:id',
    component:songcomment,
    name:songcomment
  },
  {
    path:'/floor/:id',
    component:floor,
    name:floor
  }
]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
   if(window.localStorage.getItem('userid')){
    store.state.isLogin=true
    userdata(window.localStorage.getItem('userid'))
    next()
   }else{
    next()
   }
})

export default router
