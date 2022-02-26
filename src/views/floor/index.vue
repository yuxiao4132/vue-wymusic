<template>
	<div class="floorcomment">
      <TobTab class="tobtab">
			<div slot="left">
                <span @click="$router.back()" class="iconfont icon-fanhui">
                </span>
                <span>回复({{commentslength}})</span>
            </div>
			<div slot="center">
			</div>
			<div slot="right"></div>
	</TobTab>
    <div class="first">
         <div class="commentinfo">
               <img  :src="floorfirst.img" />
               <div class="iteminfo">
                 <p>{{floorfirst.name}}</p>
                 <p class="content">{{floorfirst.content}}</p>
               </div>
               <div  class="zan" @click="firstzan">
                 <span :class="{'active': flag}" class="contetninfo" >{{floorfirst.zan}}</span>
                 <span :class="{'active': flag}" class="iconfont icon-dianzan_kuai"></span>
               </div>
           </div>
    </div>
       <div class="floor" v-if="comments.length">
           <p class="huifu">全部回复</p>
           <div class="commentinfo" v-for="(item,index) in comments">
               <img  :src="item.user.avatarUrl" />
               <div class="iteminfo">
                 <p>{{item.user.nickname}}</p>
                 <p class="content">{{item.content}}</p>
               </div>
               <div  class="zan" @click="zanclick(index,item)">
                 <span class="contetninfo" ref="content">{{item.likedCount}}</span>
                 <span ref="dianzan"  class="iconfont icon-dianzan_kuai"></span>
               </div>
           </div>
       </div>

       <div class="floor" v-else>
          <p class="huifu">暂时没有回复</p>
       </div>
    </div>
</template>

<script>
  import TobTab from '@/components/TobTab'
  import {pinglun} from '@/api/comment'
  import {mapMutations,mapGetters, mapState} from 'vuex'
  export default {
    name: 'floor',
	data() {
	  return {
	      zan:this.floorfirst,
        comments:[],
        flag:false
	  }
	},
    computed:{
       ...mapGetters([
            'floorfirst',
            'floortype'
          ]),
          commentslength(){
            if(this.comments){
              return this.comments.length
            }else{
              return 0
            }
          } 
    },
    components:{
      TobTab
    }, 
    mounted(){
      console.log(this.type)
      this.getpinglun()
    },
    methods:{
      ...mapMutations(['addfirst','removefirst']),
      zanclick(index,item){
        if(this.$refs.dianzan[index].style.color=='red'){
          item.likedCount--
          this.$refs.dianzan[index].style.color='black'
          this.$refs.content[index].style.color='black'
        }else{
          item.likedCount++
          this.$refs.dianzan[index].style.color='red'
          this.$refs.content[index].style.color='red'
        } 
      },
      firstzan(){
        this.flag=!this.flag
        if(this.flag){
           this.addfirst()
           
        }else{
           this.removefirst()
           
        }
      },
      async getpinglun(){
        const {data}=await pinglun({
          parentCommentId:this.$route.params.id,
          id:this.floorfirst.id,
          type:this.floortype
        })
        this.comments=data.comments
        console.log(this.comments) 
      }
    }
  }
</script>

<style scoped lang="less">
  .active{
    color: red !important;
  }
  .tobtab{
	 height: 60px;
	 display: flex;
	 line-height: 60px;
	 justify-content: space-between;
	 background-color: #fff;
	 z-index: 9;
	 width: 100%;
	 padding: 0 10px;
	 position:fixed;
	 top: 0;
	 left: 0;
 }
 .tobtab span{
     font-size: 20px;
 }
 .icon-fanhui{
     margin-right: 15px;
 }
 .commentinfo{
   display: flex;
   position: relative;
//    margin: 30px 0;
 }
 .commentinfo img{
   width: 50px;
   height: 50px;
   border-radius: 50%;
 }
 .getcomment{
   padding: 0 15px;
 }
 .pinglun{
   display: flex;
   justify-content: space-between;
   font-size: 14px;
   margin-top: 20px;
 }
 .bold{
   font-weight: bold;
 }
 .first{
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    padding: 30px 0; 
    border-bottom: 10px solid #ccc;
 }
 .first,.floor{
//    margin-top: 20px;
   position: relative;
 }
 .huifu{
     font-size: 16px;
 }
 .floor{
     padding: 0 10px;
     margin-top: 20px;
 }

 .floor>div{
     margin:  20px 0;
 }
 .pinfinfo span{
   margin: 0 10px;
 }
 .iteminfo{
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   margin-left: 10px;
 }
 .iteminfo p{
   font-size: 14px;
 }
 .zan{
   font-size: 15px;
   position: absolute;
   right: 0;
   top: 3px;
 }
 .zan span:first-child{
   margin-right: 5px;
 }
.icon-dianzan_kuai{
  color: #000;
}
.content{
  margin-top: 10px;
}
.huifu{
  margin-top: 6px;
  color: rgba(14, 176, 240, 0.726);
}
</style>