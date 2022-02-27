<template>
	<div class="video">
    <ScrollY class="content" ref="scroll" 
		:probe-type="3"
		:pull-up-load="true"
    :pull-down-refresh="true"
		@pullingUp="loadMore(true)"
    @pullingDown='loadMore(false)'>
	  <van-tabs class="tabs" v-model="videoactive" color="#fff">
        <van-tab class="videonames">
           <div @click="isvdimg(index)" :key="index" v-for="(item,index) in shiping" class="shiping">
               <video ref="videos"   v-if="index===currentindex" class="videourl"  :src="url" controls="controls">
               </video>
               <img v-else class="videoimg" :src="item.cover" @load="imgLoad"/>
               <div class="videoinfo">
                 <span>{{item.artistName}}-</span>
                 <span>{{item.name}}</span>
               </div>
           </div>
         </van-tab>
      </van-tabs>
    </ScrollY>
    </div>
</template>

<script>
  import { Toast } from 'vant'
  import {getallmv,mv} from '@/api/video'
  import ScrollY from '@/components/ScrollY'
  import {itemListenerMixin} from '@/common/mixin'
  export default {
    name: 'Videos',
    data(){
       return{
         currentindex:null,
         shiping:[],
         url:'',
         flag:true,
         offset:1,
         videoactive:this.active
       }
    },
    props:{
       videonames:{
         type:Array,
         require:true
        },
       active:{
         type:Number,
         require:true
       }
    },
    components:{
      ScrollY
    },
     mixins:[itemListenerMixin],
    watch:{
       active(val,oldVal){
         this.currentindex=null
         this.offset=1
         this.shiping=[]
         this.$refs.scroll.scrollTo(0,0,0)
         if(val==0){
              this.videosall()
            }else if(val==1){
               this.videosall(false,'港台')
            }else if(val==2){
               this.videosall(false,'欧美')
            }else if(val==3){
              this.videosall(false,'内地')
            }else if(val==4){
              this.videosall(false,'日本')
            }else if(val==5){
              this.videosall(false,'韩国')
            }else if(val==6){
              this.videosall(false,'官方版')
            }else if(val==7){
              this.videosall(false,'现场版')
            }else if(val==8){
              this.videosall(false,'网易出品')
            }
       }
    },
    created(){
      this.videosall('')
    },
    activated(){
      this.$refs.scroll.refresh()
    },
    destroyed(){
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods:{
        imgLoad(){
          this.$bus.$emit('itemImageLoad')
        },
        async isvdimg(index){
          this.currentindex=index
          const {data}=await mv({id:this.shiping[index].id})
          this.url=data.url
        },
        loadMore(flag){
          Toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
          this.offset+=15
          //console.log(this.offset)
          if(this.active==0){
              this.videosall(flag,'')
            }else if(this.active==1){
               this.videosall(flag,'港台')
            }else if(this.active==2){
               this.videosall(flag,'欧美')
            }else if(this.active==3){
              this.videosall(flag,'内地')
            }else if(this.active==4){
              this.videosall(flag,'日本')
            }else if(this.active==5){
              this.videosall(flag,'韩国')
            }else if(this.active==6){
              this.videosall(flag,'官方版')
            }else if(this.active==7){
              this.videosall(flag,'现场版')
            }else if(this.active==8){
              this.videosall(flag,'网易出品')
            }
        },
        async videosall(flag=null,type){
           try{
              const {data}=await getallmv({
              limit:15,
              offset:this.offset,
              area:type
            })
            if(flag){
              this.shiping.push(...data)
              this.$refs.scroll.finishPullUp()
            }else{
              this.shiping.unshift(...data)
              this.$refs.scroll.finishPullDown()
            }
            Toast.success('加载成功');
            console.log(data,type)
           }catch(err){
            Toast.fail('暂无更多视频');
            return false
           }
        }
    }
  }
</script>

<style scoped lang="less">
/deep/ .van-tabs__wrap{ 
  position: fixed;
  z-index: 9;
  
}
/deep/ .van-tabs__content{
  margin-top: 50px;
}
/deep/ .van-tabs{
  position: relative;
  display: flex;
  justify-content: center;
}

 .videourl{
   width: 300px;
   height: 200px;
 }

 .videoimg{
   width: 300px;
   height: 200px;
   background-size: cover;
 }
.content{
	  position: absolute;
	  left: 0;
	  right: 0;
	  top: 60px;
	  bottom: 50px;
  }
 .videonames>div:first-child{
   margin: 20px auto;
 }
 .videonames div{
   text-align: center;
   margin: 15px auto;
 }
 .videoinfo span{
   font-size: 20px;
   line-height: 20px;
 }
.van-tabs__nav--line{
  display: none;
}
</style>