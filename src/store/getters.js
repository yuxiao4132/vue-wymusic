export default{
    currentindex(state){
       return state.currentindex
    },
    songlist(state){
       return state.songlist
    },
    sheetlist(state){
       return state.sheetinfo
    },
    floorfirst(state){
       return state.first
    },
    floortype(state){
       return state.type
    },
    musicurl(state){
       return state.musicurl
    },
    isLogin(state){
       return state.isLogin
    },
    gettime(state){
       return state.time
    },
    getduration(state){
       return state.duration
    },
    getwidth(state){
       return state.width
    },
    songinfo(state){
       return state.songinfo
    },
    getisbofang(state){
       return state.isbofang
    },
    getissheet(state){
       return state.issheet
    },
    getuserinfo(state){
       return state.userinfo
    },
    getsongid(state){
      //  console.log('???')
       return state.songid
    },
    getishome(state){
       return state.ishome
    },
    getlyric(state){
       return state.lyric
    },
    getsheetid(state){
       return state.sheetid
    },
    getsongping(state){
      return state.songping
    }
}