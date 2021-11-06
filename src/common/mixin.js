import {debounce} from './utils.js'
export const itemListenerMixin={
  data(){
    return {
      itemImgListener:null
    }
  },
   mounted(){
     const refresh=this.$refs.scroll.refresh
     this.itemImgListener=debounce(()=>{
        refresh()
     },200)
     this.$bus.$on('itemImageLoad',this.itemImgListener)
   }
}


