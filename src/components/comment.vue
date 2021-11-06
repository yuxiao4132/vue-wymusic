<template>
	<div class="tabbar">
	   <ScrollY class="content" ref="scroll" 
		:probe-type="3"
		:pull-up-load="true"
    @pullingUp="loadMore">
           <slot name="comment"></slot>
           <getcomment :getcomment='getcomment' :cenglist='cenglist'></getcomment>
       </ScrollY>
    </div>
</template>

<script>
  import {debounce} from '@/common/utils'
  import ScrollY from '@/components/ScrollY' 
  import getcomment from '@/components/getcomment.vue'
  import {itemListenerMixin} from '@/common/mixin'
  export default {
    name: 'Comment',
	data() {
	  return {
	    offset:1,
      scrollY:null
	  }
	},
    mixins:[itemListenerMixin],
    props:{
        getcomment:{
            type:Array,
            require:true
        },
        cenglist:{
          type:Array,
          require:true
        }
    },
    computed:{
      //  commentlist(){
      // if(window.localStorage.getItem('commentid')==this.$route.params.id){
      //   return JSON.parse(window.localStorage.getItem('comment'))
      //   }else{
      //     return this.getcomment
      //   }
      // }
    },
    mounted(){
      // this.$refs.scroll.refresh()
    },
    // activated(){
    //   //console.log(JSON.parse(window.localStorage.getItem('comment')))
    //   if(window.localStorage.getItem('commentid')==this.$route.params.id){
    //     this.$refs.scroll.scrollTo(0,window.localStorage.getItem('scroll'))
    //   }else{
    //     this.$refs.scroll.scrollTo(0,0,0)
    //   }
    // },
    // beforeDestroy(){
    //   console.log('??')
    //   this.scrollY=this.$refs.scroll.getScrollY()
    //   window.localStorage.setItem('scroll',this.scrollY,0)
    //   window.localStorage.setItem('commentid',this.$route.params.id)
    //   window.localStorage.setItem('comment',JSON.stringify(this.getcomment))
    // },
    components:{
        ScrollY,
        getcomment
    },
    methods:{
        loadMore(){
          //  debounce(()=>{
            this.$emit('resultadd',++this.offset)
            //this.$refs.scroll.refresh()
            this.$refs.scroll.finishPullUp()
        }
    }
  }
</script>

<style scoped lang="less">
  .content{
      position: absolute;
	  left: 0;
	  right: 0;
	  top: 60px;
	  bottom: 44px;
  }
</style>