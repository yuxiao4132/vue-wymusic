<template>
	<div class="sheet">
		<!-- 配置遮罩层,并通过点击实现隐藏显示 -->
		<div class="back" @click="show=!show" v-show="show">X</div>
	  <van-overlay
	   class="overlay"
	   @click="isZindex"
	   :show="show"
	   :duration="0.2">
	     
	     <div class="overlay-top">
			 <img :src="sheetinfo.imgurl"/>
			 <p>{{sheetinfo.name}}</p>
		 </div>
		 <div class="overlay-bottom">
			 <div class="tags">
				 <span>标签:</span>
				 <p 
				   v-for="(item,index) in tags"
				   >
				    {{item}}
				 </p>
			 </div>
			 <div class="description">
				 {{sheetinfo.description}}
			 </div>
		 </div>
	   </van-overlay>
	  <TobTab class="tobtab">
	  	<div slot="left" class="left" @click="$router.push('/')">
	  		<span class="iconfont icon-fanhui"></span>
	  		<p>歌单</p>
	  	</div>
	  	<div slot="right" class="right">
	  		<span class="iconfont icon-sousuo"></span>
	  		<span class="iconfont icon-gengduo-shuxiang"></span>
	  	</div>
	  </TobTab>
	  <ScrollY class="content" ref="scroll" 
		:probe-type="3"
		:pull-up-load="true">
	    <SheetInfo
		 :info="sheetinfo"
		 @isZindex="isZindex"></SheetInfo>
	    <SheetSong 
		:songlist="tracks"
		:sheetid="id"></SheetSong>
	  </ScrollY>
    </div>
</template>

<script>
  import TobTab from '@/components/TobTab'
  //歌单信息组件
  import SheetInfo from './components/SheetInfo.vue'
  //歌单歌曲组件
  import SheetSong from './components/SheetSong.vue'
  import ScrollY from '@/components/ScrollY'	
  import {getsheet} from '@/api/sheet'
  import {itemListenerMixin} from '@/common/mixin'
  export default {
    name: 'SheetIndex',
	data(){
		return {
			id:null,
			sheetlist:null,
			sheetinfo:{},
			tracks:[],
			show:false,
			tags:null
		}
	},
	mixins:[itemListenerMixin],
	created() {
		//设置id为路由id,为歌单id
		this.id=this.$route.params.id
		this.sheetall()
		// console.log(this.id)
	},
	components:{
		SheetInfo,
		SheetSong,
		ScrollY,
		TobTab
	},
	methods:{
		async sheetall(){
			this.$bus.$on('initial',()=>{
				
			})
			const data = await getsheet({id:this.id})
			this.sheetlist=data.playlist
			//配置sheetinfo组件需要传入的数据
			let sheetinfo={
			  imgurl:this.sheetlist.coverImgUrl,
			  name:this.sheetlist.name,
			  count:this.sheetlist.playCount,
			  description:this.sheetlist.description,
			  uid:this.sheetlist.userId,
			  uname:this.sheetlist.creator.nickname,
			  uimgurl:this.sheetlist.creator.avatarUrl,
			  sheetdetails:this.sheetlist.subscribedCount,
			  commentCount:this.sheetlist.commentCount,
			  shareCount:this.sheetlist.shareCount
			}
			this.sheetinfo=sheetinfo
			//歌单歌曲数据
			this.tracks=this.sheetlist.tracks
			//歌单标签数据
			this.tags=this.sheetlist.tags
			//赋值vuex sheetinfo的值
			this.$store.state.sheetinfo=sheetinfo
		},
		isZindex(){
			this.show=!this.show
		}
	},
  }
</script>

<style scoped lang="less">
  .sheet{
	  // position: relative;
  }
  .tobtab{
	 background-color: #887469;
	 opacity: 1;
	 padding: 0 15px;
  	 display: flex;
  	 justify-content: space-between;
	 height: 50px;
	 line-height: 50px;
	 // position: ;
  }
  .tobtab span{
  	 color: #fff;
  	 font-size: 25px;
  }
  .tobtab p{
	  display: inline-block;
	  color: #fff;
	  font-size: 22px;
	  padding-left: 15px;
  }
  .icon-sousuo{
	  padding-right: 15px;
  }
  .content{
	  position: absolute;
	  left: 0;
	  right: 0;
	  top: 50px;
	  bottom: 0px;
	  z-index: -1;
  }
  .overlay{
	   background-color: #504644;
	   display: flex;
	   flex-direction: column;
	  
	   // position: relative;
  }
  
  .overlay-top{
	  margin: 60px auto;
	  width: 200px;
	  height: 200px;
  }
  .overlay-top img{
	  width: 200px;
	  height: 200px;
	  border-radius: 10px;
  }
  .overlay-top p{
	  margin-top: 10px;
	  font-size: 15px;
	  color: #fff;
  }
  .overlay-bottom{
	  padding: 10px 30px;
  }
  .tags{
	  display: flex;
	  font-size: 16px;
	  color: #fff;
	  line-height: 23px;
	  height: 23px;
  }
  .tags span{
	  padding-right: 10px;
  }
  .tags p{
	  font-size: 12px;
	  margin-right: 5px;
	  background-color: #C0C0C0;
	  padding: 0px 10px;
	  border-radius: 10px;
	  opacity: .8;
  }
  .back{
	  position: absolute;
	  right: 13px;
	  top: 10px;
	  color: #fff;
	  z-index: 9;
  }
  .description{
	  font-size: 14px;
	  color: #fff;
	  padding-right: 30px;
	  margin-top: 15px;
  }
</style>