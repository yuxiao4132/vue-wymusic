<template>
	<div class="searchhot">
       <div class="hot"> 
         <div @click="hotclick(item.searchWord)" class="hotlist" v-for="(item,index) in hotlist" :key="index">
            <p class="hotindex">{{++index}}</p>
            <p class="content">{{item.searchWord}}</p>
         </div>
       </div>
    </div>
</template>

<script> 
  import {searchhot} from '@/api/search'
  export default {
    name: 'SearchHot',
    data(){
     return{
         value:'',
         hotlist:[]
     }
    },
    props:{
      hot:{
          type:Array,
          require:true
      }
    },
    created(){
      this.getsearchhot()
    },
    computed:{
	
	},
    mounted(){
      
    },
    methods:{
      async getsearchhot(){
         const {data}=await searchhot()
         this.hotlist=data
        //  console.log(this.hotlist)
      },
      hotclick(value){
         this.$emit('gethot',value)
      }
    },
    components:{
      
    }
  }
</script>

<style scoped lang="less">

 .hot{
     display: flex;
     flex-wrap: wrap;
     justify-content: space-around;
    //  width: 100%;
    text-align: center;
    // padding-right: 50px;
    box-shadow: 1px 1px 10px #cecece;
    // border: 1px solid #cecece;
 }
 .hotlist{
     display: flex;
     font-size: 14px;
     width: 50%;
     padding: 3px 0;
     line-height: 30px;
     padding-left: 20px;
 }
 .hotindex{
     margin-right: 5px;
 }
 .content{
   overflow:hidden;
	 text-overflow:ellipsis;
   white-space:nowrap;
 }
</style>