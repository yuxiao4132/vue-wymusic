<template>
	<div class="getcomment">
    <div class="pinglun">
        <div>
          <span class="bold">评论区</span>
        </div>
        <div class="pinfinfo">
          <span class='bold'>推荐</span>
          <span>最热</span>
          <span>最新</span>
        </div>
    </div> 
    
      
        <div class="commentitem" v-for="(item,index) in getcomment" :key="index">
           <div class="commentinfo">
               <img @load="imgLoad" :src="item.user.avatarUrl" />
               <div class="iteminfo">
                 <p>{{item.user.nickname}}</p>
                 <p class="content">{{item.content}}</p>
                 <p v-show="cenglist[index]" class="huifu" @click="getpinglun(item)">{{cenglist[index]}}条回复></p>
               </div>
               <div  class="zan" @click="zanclick(index,item)">
                 <!-- <span class="active iconfont icon-dianzan_kuai"></span> -->
                 <span class="contetninfo" ref="content">{{item.likedCount}}</span>
                 <span ref="dianzan"  class="iconfont icon-dianzan_kuai"></span>
               </div>
           </div>
        </div>
     </div>
</template>

<script>
  import {pinglun} from '@/api/comment'
  import floor from '@/views/floor'
  export default {
    name: 'getcomment',
    data(){
      return {
          offset:1,
          t:0,
      }
    },
    components:{
      floor
    },
    mounted(){
      console.log(this.cenglist)
    },
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
    destroyed(){
     this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods:{
      imgLoad(){
          this.$bus.$emit('itemImageLoad')
      },
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
      async getpinglun(item){
        this.show=!this.show
        this.$store.state.first={
          img:item.user.avatarUrl,
          name:item.user.nickname,
          content:item.content,
          zan:item.likedCount,
          id:this.$route.params.id
        }
        this.$router.push('/floor/'+item.commentId)
      }
    }
  }
</script>

<style scoped lang="less">
 .commentinfo{
   display: flex;
   margin: 30px 0;
 }
 .commentinfo img{
   width: 50px;
   height: 50px;
   border-radius: 50%;
 }
 .getcomment{
   padding: 0 15px;
   position: relative;
   //height: 100vh;
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
 .commentitem{
   margin-top: 20px;
   position: relative;
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
.popup{
    // // z-index: 2022;
     position: absolute;
    // // height: 300px;
    // // width: 100%;
    // // position: absolute;
    // // /* top: 0; */
    // bottom: 100px;
    // position: fixed;
    bottom: 0;
}
  
</style>