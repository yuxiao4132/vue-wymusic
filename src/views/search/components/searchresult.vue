<template>
	<div class="searchresult">

  <van-list
  v-model="loading"
  :finished="false"
  finished-text="没有更多了"
  @load="onLoad"
>
  <div class="allleft">
				<span class="iconfont icon-24gf-playCircle"></span>
				<span class="bofang">播放全部</span>
	</div>
  <div @click="searchpush(index)" class="resultinfo" v-for="(item,index) in resultlist" :key="index">
         <div class="title">
           <p :class="{'active':item.name==value}">{{item.name}}</p>
         </div>
         <div class="name">
           <span :class="{'active':item.artists[0].name==value}">{{item.artists[0].name}}</span>
           <span>&nbsp;-&nbsp;</span>
           <span :class="{'active':item.album.name==value}">{{item.album.name}}</span>
         </div>
         <span class="iconfont icon-gengduo-shuxiang"></span>
  </div>
</van-list>
       
  </div>
</template>

<script>
  export default {
    name: 'result',
    data(){
     return{
         value:'',
         loading: false,
         offset:1,
         isActive:false,
         value:''
     }
    },
    props:{
      resultlist:{
        type:Array,
        require:true
      },
      finished:{
        type:Boolean,
        require:true
      }
    },
    created(){
     
    },
    computed:{
	
 	},
    mounted(){
      this.$bus.$on('getvalue',value=>{
        this.value=value
        // console.log(this.value)
      })
    },
    methods:{
      searchpush(index){
       this.$store.state.ishome=false
       console.log(index)
      //  this.$store.state.currentindex=index+1
			 this.$store.state.songlist=this.resultlist
       this.$store.state.songid=this.resultlist[index].id
			 this.$store.state.isbofang=true
       this.$store.state.issheet=false
       this.$router.push('/song')
       
      //  this.$router.push('/song/'+this.resultlist[index].id)
      },
      onLoad() {
        this.$emit('resultadd',++this.offset)
        this.loading=false
      }
    },
    components:{
      
    }
  }
</script>

<style scoped lang="less">
  .active{
    color: blue;
  }
  .searchresult{
    background-color: #fff;
    position: absolute;
    top: 50px;
    padding:0 10px;
    //   height: 100vh;
    width: 100%;
    height:calc(100% - 50px);
  }
  .resultinfo{
    margin: 15px 0;
    position: relative;
  }
  .name{
    padding-left: 10px;
  }
  .name span{
    font-size: 14px;
  }
  .title p{
    font-size: 16px;
  } 
   .icon-24gf-playCircle{
	 font-size: 22px;
	 color: #ff443b;
	 padding-right: 10px;
   position: relative;
	 top: 4px;
 }
 .bofang{
	 font-size: 14px;
	 padding-right:5px;
 }
 .icon-gengduo-shuxiang{
  font-size: 20px;
  position: absolute;
  right: 0;
  top: 5px;
 }
</style>