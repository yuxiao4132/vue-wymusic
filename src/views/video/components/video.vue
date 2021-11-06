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
  import {getallmv,mv,getvideo} from '@/api/video'
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
         if(val==0){
              this.videosall1()
            }else if(val==1){
               this.videosall2()
            }else if(val==2){
               this.videosall3()
            }else if(val==3){
              this.videosall4()
            }else if(val==4){
              this.videosall5()
            }else if(val==5){
              this.videosall6()
            }else if(val==6){
              this.videosall7()
            }else if(val==7){
              this.videosall8()
            }else if(val==8){
              this.videosall9()
            }
       }
    },
    created(){
        this.videosall1()
    },
    destroyed(){
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods:{
      async video(){
         const data=await getvideo({id:9104})
         console.log(data)
      },
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
          this.offset+=10
          console.log(this.offset)
          if(this.active==0){
              this.videosall1(flag)
            }else if(this.active==1){
               this.videosall2(flag)
            }else if(this.active==2){
               this.videosall3(flag)
            }else if(this.active==3){
              this.videosall4(flag)
            }else if(this.active==4){
              this.videosall5(flag)
            }else if(this.active==5){
              this.videosall6(flag)
            }else if(this.active==6){
              this.videosall7(flag)
            }else if(this.active==7){
              this.videosall8(flag)
            }else if(this.active==8){
              this.videosall9(flag)
            }
          Toast.success('加载成功');
           this.$refs.scroll.finishPullUp()
           this.$refs.scroll.finishPullDown()
        },
        async videosall1(flag){
           this.$bus.$on('current',()=>{
            this.offset=1
            this.shiping=[]
          })
           const {data}=await getallmv({
             limit:10,
             offset:this.offset
           })
           if(flag){
             this.shiping.push(...data)
           }else{
             this.shiping.unshift(...data)
           }
        },
         async videosall2(flag){
          this.$bus.$on('current',()=>{
            this.currentindex=null
            this.offset=1
            this.shiping=[]
          })
           const {data}=await getallmv({
             limit:10,
             offset:this.offset,
             area:'港台'
           })
           if(flag){
             this.shiping.push(...data)
           }else{
             this.shiping.unshift(...data)
           }
        },

        async videosall3(flag){
          this.$bus.$on('current',()=>{
            this.currentindex=null
            this.offset=1
            this.shiping=[]
          })
           const {data}=await getallmv({
             limit:10,
             area:'欧美',
             offset:this.offset
           })
           if(flag){
             this.shiping.push(...data)
           }else{
             this.shiping.unshift(...data)
           }
        },

        async videosall4(flag){
          this.$bus.$on('current',()=>{
            this.currentindex=null
            this.offset=1
            this.shiping=[]
          })
           const {data}=await getallmv({
             limit:10,
             area:'内地',
             offset:this.offset
           })
           if(flag){
             this.shiping.push(...data)
           }else{
             this.shiping.unshift(...data)
           }
        },

        async videosall5(flag){
          this.$bus.$on('current',()=>{
            this.currentindex=null
            this.offset=1
            this.shiping=[]
          })
           const {data}=await getallmv({
             limit:10,
             area:'日本',
             offset:this.offset
           })
          if(flag){
             this.shiping.push(...data)
           }else{
             this.shiping.unshift(...data)
           }
        },

        async videosall6(flag){
          this.$bus.$on('current',()=>{
            this.currentindex=null
            this.offset=1
            this.shiping=[]
          })
           const {data}=await getallmv({
             limit:10,
             area:'韩国',
             offset:this.offset
           })
           if(flag){
             this.shiping.push(...data)
           }else{
             this.shiping.unshift(...data)
           }
        },

        async videosall7(flag){
          this.$bus.$on('current',()=>{
            this.currentindex=null
            this.offset=1
            this.shiping=[]
          })
           const {data}=await getallmv({
             limit:10,
             type:'官方版',
             offset:this.offset
           })
           if(flag){
             this.shiping.push(...data)
           }else{
             this.shiping.unshift(...data)
           }
        },

        async videosall8(flag){
          this.$bus.$on('current',()=>{
            this.currentindex=null
            this.offset=1
            this.shiping=[]
          })
           const {data}=await getallmv({
             limit:10,
             type:'现场版',
             offset:this.offset
           })
          if(flag){
             this.shiping.push(...data)
           }else{
             this.shiping.unshift(...data)
           }
        },

        async videosall9(flag){
          this.$bus.$on('current',()=>{
            this.currentindex=null
            this.offset=1
            this.shiping=[]
          })
           const {data}=await getallmv({
             limit:10,
             type:'网易出品',
             offset:this.offset
           })
           if(flag){
             this.shiping.push(...data)
           }else{
             this.shiping.unshift(...data)
           }
        },
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
//  .shiping>img{
//    position: relative;
//    display: block;
//  }
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