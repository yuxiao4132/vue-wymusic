// import router from '@/router'
export default{
    reducemodify(state){
        if(state.currentindex<=1){
            state.currentindex=state.songlist.length
        }else{
            state.currentindex--
        }
    },
    addmodify(state){
       
        if(state.currentindex>=state.songlist.length){
            state.currentindex=1
        }else{
            state.currentindex++
            state.currentindexs++
        }
        console.log(state.currentindex)
    },
    // addcurrentindex(state){
    //    state
    // },
    addfirst(state){
        state.first.zan++
        console.log(state.first.zan)
    },
    removefirst(state){
        state.first.zan--
        console.log(state.first.zan)
    },
    isbofang(state){
        state.isbofang=!state.isbofang
    }
}