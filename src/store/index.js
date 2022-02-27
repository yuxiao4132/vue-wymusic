import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters.js'
import {getItem} from '@/common/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:window.localStorage.getItem('token'),
	  currentindex:null,
    userid:null,
	  songlist:[],
    active:0,
    sheetinfo:null,
    comments:null,
    first:null,
    type:null,
    musicurl:'',
    isLogin:false,
    time:0,
    duration:0,
    width:0,
    isnext:false,
    sheetid:'',
    songinfo:null,
    isbofang:true,
    issheet:true,
    userinfo:null,
    songid:null,
    ishome:false,
    commentinfo:null,
    commenttype:null,
    lyric:'',
    songping:''
  },
  mutations,
  actions,
  getters
})
