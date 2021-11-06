<template>
	<div class="comments">
	   <TobTab class="tobtab">
			<div slot="left">
        <span @click="$router.back()" class="iconfont icon-fanhui"></span>
        <span>评论:({{sheetinfo.commentCount}})</span>
      </div>
			<div slot="center">
			</div>
			<div slot="right"><span class="iconfont icon-fenxiang"></span></div>
		</TobTab>
    <comment class="comment" 
    :getcomment='comments' 
    :cenglist='cenglist'
    @resultadd='resultadd'>
      <div slot="comment">
        <commentinfo
         :commentinfo='sheetinfo'></commentinfo>
      </div>
    </comment>
     <div class="pinglun">
      <van-popup
      v-if="show"
      class="popup"
		   v-model="show" 
		   position="bottom"
       :style="{ height: '20%' }">
         <textarea v-model="text" class="text"></textarea>
         <van-button @click="getpinglun" class="button">发布</van-button>
		  </van-popup>
      <van-field v-else v-model="value" label="写评论...." @click="show=!show"/>
     </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  import {getsheetcomment,pinglun,firstpinglun} from '@/api/comment'
  import {mapState} from 'vuex'
  import TobTab from '@/components/TobTab'
  import comment from '@/components/comment'
  import commentinfo from '@/components/commentinfo.vue'
  // import commentinfo from './components/commentinfo.vue'
  // import getcomment from './components/getcomment.vue'
  export default {
    name: 'sheetcomment',
	data(){
      return{
          value:null,
          id:this.$route.params.id,
          comments:[],
          offset:1,
          show:false,
          text:'',
          cenglist:[],
          before:null
      }
    },
    computed:{
       ...mapState([
            'sheetinfo',
          ])   
    },
    created(){
       this.sheetcommt()
    },
    mouthed(){
        
    },
    components:{
     TobTab,
     comment,
     commentinfo
    },
   beforeDestroy(){
       this.$store.state.type=2
    },
    methods:{
        async sheetcommt(){
             const data=await getsheetcomment({
                id:this.id,
                before:null,
                offset:this.offset
             })
             //this.$store.state.type=2
             this.comments=data.comments
             this.louceng()
             console.log(this.comments)
        },
        async resultadd(offset){
          //this.before=this.comments[this.comments.length-1].time
          this.offset=offset
          // const before=this.comments[this.comments.length-1].time
          const data=await getsheetcomment({
                id:this.id,
                // before:this.comments[this.comments.length-1].time
                offset:this.offset,
                before:this.comments[this.comments.length-1].time
             })
            const oldtime=this.comments[this.comments.length-1].time
            if(!data.comments.length){
              Toast.fail('没有更多回复')
              return false
            }
            if(data &&  oldtime!=data.comments[data.comments.length-1].time){
              this.comments.push(...data.comments)
            }
          console.log(data.comments)
          this.louceng()
          // console.log(this.comments[this.comments.length-1].time)
          // console.log(this.before)
      },
       async louceng(){
        let i=0
        while(i<this.comments.length){
          const {data}=await pinglun({
          parentCommentId:this.comments[i++].commentId,
          id:this.$route.params.id,
          type:2
        })
        this.cenglist.push(data.totalCount)
        // console.log(data.totalCount)
        // console.log(data)
        // console.log(this.comments[0].commentId)
        }
      }
    }
  }
</script>

<style scoped lang="less">
 .tobtab{
	 height: 60px;
	 display: flex;
	 line-height: 60px;
	 justify-content: space-between;
	 background-color: #fff;
	 width: 100%;
   z-index: 9;
	 padding: 0 15px;
	 position:fixed;
	 top: 0;
	 left: 0;
   font-size: 22px;
 }
 .icon-fanhui{
   font-size: 22px;
   margin-right: 8px;
 }
 .icon-fenxiang{
   font-size: 22px;
 }
 .pinglun{
   position: fixed;
   bottom: 0px;
   background-color: #fff;
   width: 100%;
 }
 .text{
   border: none;
   overflow:hidden;
   height: 150px;
 }
 .popup{
   position: relative;
 }
 .button{
   position: absolute;
   bottom: 0;
   right: 0;
 }
</style>