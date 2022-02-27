<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      },
	    pullDownRefresh:{
        type:Boolean,
        default:false
      },
      horizontal:{
        type:String,
        default:''
      },
    },
    data(){
      return {
        scroll:null
      }
    },
    mounted(){
      this.scroll=new BScroll(this.$refs.wrapper,{
         probeType:this.probeType,
         click:true,
        //  preventDefaultException:{tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|DIV)$/},
         pullUpLoad:this.pullUpLoad,
		     eventPassthrough:this.horizontal,
         pullDownRefresh:this.pullDownRefresh,
         freeScroll:true
        //  touchmove:false
	    	//  disableTouch:true
      })
      if(this.probeType===2 || this.probeType===3)
        this.scroll.on('scroll',position=>{
        
      })

      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
         this.$emit('pullingUp')
        })
      }
     
      if(this.pullDownRefresh){
        this.scroll.on('pullingDown',()=>{
          this.$emit('pullingDown')
        })
      }
    },
    methods:{
      scrollTo(x,y,time=300){
        // this.refresh()
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      finishPullDown(){
        this.scroll.finishPullDown()
      }, 
      refresh(){
        this.scroll && this.scroll.refresh()
		// console.log('???')
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0

      }
    }
  }
</script>

<style scoped>
  
</style>