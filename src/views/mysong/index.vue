<template>
	<div class="mysong">
      <TobTab class="tobtab">
	  	<div slot="left" class="left" @click="$router.back()">
	  		<span class="iconfont icon-fanhui"></span>
	  		<p>最近播放</p>
	  	</div>
	  	<div slot="right" class="right">
	  		<span class="">清空</span>
	  	</div>
	  </TobTab>
       <SheetSong 
		:songlist="list">
	   </SheetSong>
    </div>
</template>

<script>
  import TobTab from '@/components/TobTab'
  import {getmysong} from '@/api/login'
  import SheetSong from '../../components/SheetSong.vue'
  export default {
    name: 'MySong',
    created(){
      this.mysong()
    },
    data(){
        return {
           list:[]
        }
    },
    components:{
      SheetSong,
      TobTab
    },
    methods:{
        async mysong(){
          const data = await getmysong({
              //this.$store.state.userid
              uid:localStorage.getItem('userid'),
              type:0
          })
          this.list=data.allData
          //console.log(this.list)
        }
    }
  }
</script>

<style scoped lang="less">
  .tobtab{
	 background-color: #fff;
	 opacity: 1;
	 padding: 0 15px;
  	 display: flex;
  	 justify-content: space-between;
	 height: 50px;
	 
     align-items: center;
	 // position: ;
  }
  .tobtab span{
  	 color: #000;
  	 font-size: 16px;
  }
  .tobtab p{
	  display: inline-block;
	  color: #000;
	  font-size: 20px;
	  padding-left: 15px;
  }
</style>