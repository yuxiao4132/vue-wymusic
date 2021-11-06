<template>
	<div class="video">
		 <TobTab class="tobtab">
			<div slot="left"><span class="iconfont icon-daohang"></span></div>
			<div slot="center">
				<van-search placeholder="请输入搜索关键词" />
			</div>
			<div slot="right"><span class="iconfont icon-maikefeng
"></span></div>
		</TobTab>
        
        <van-tabs class="vantab" @click="tabClick" v-model="active">
          <van-tab class="videonames" v-for="(item,index) in videonames"
           :title="item"
           :key="index">
		 </van-tab>
        </van-tabs>

		<!-- <ScrollY class="content" ref="scroll" 
		:probe-type="3"
		:pull-up-load="true"
		@pullingUp="loadMore"> -->
          <Videos class="videos" 
		  :videonames="videonames"
		  :active="active"></Videos>
		<!-- </ScrollY> -->
  </div>
</template>

<script>
 import ScrollY from '@/components/ScrollY' 
 import TobTab from '@/components/TobTab'
 import Videos from './components/video.vue'
//  import {itemListenerMixin} from '@/common/mixin'
  export default {
    name: 'VideoIndex',
    data(){
      return {
		active:0,
        videonames:['全部','港台','欧美','内地','日本','韩国','官方版','现场版','网易出品']
      }
    },
	// mixins:[itemListenerMixin],
	// activated(){
    // //   this.$refs.scroll.scrollTo(0,this.saveY,0)
    //   this.$refs.scroll.refresh()
    // },
    components:{
      TobTab,
	  Videos,
	  ScrollY
    },
	methods:{
		tabClick(){
			this.$bus.$emit('current')
		},
		loadMore(){

		}
	}
  }
</script>

<style scoped lang="less">
  .video{
	 padding: 0 10px;
 }
 /deep/ .van-nav-bar__title{
	 height: 46px;
	 line-height: 46px;
 }
 .van-search__content{
	 border-radius: 20px;
 }
/deep/ .tobtab{
	 height: 60px;
	 display: flex;
	 line-height: 60px;
	 justify-content: space-between;
	 background-color: #fff;
	 // z-index: 9;
	 width: 100%;
	 padding: 0 10px;
	 position:fixed;
	 top: 0;
	 left: 0;
	 z-index:9;
 }
 .iconfont{
	 font-size: 32px;
 }
 .videos{
	 margin-top:60px;
 }
.content{
	  position: absolute;
	  left: 0;
	  right: 0;
	  top: 60px;
	  bottom: 100px;
  }
  .van-tabs{
	 top:60px;
	 z-index: 99;
	 position: fixed;
	//  display: none;
  }
</style>