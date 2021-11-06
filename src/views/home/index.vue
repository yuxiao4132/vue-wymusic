<template>
	<div class="home">
		<!-- 自定义导航组件。通过具名插槽的方式提高复用性 -->
	    <TobTab class="tobtab">
			<div slot="left"><span class="iconfont icon-daohang"></span></div>
			<div slot="center">
				<van-search @click="$router.push('/search')" v-model="value" placeholder="请输入搜索关键词" />
			</div>
			<div slot="right"><span class="iconfont icon-maikefeng
"></span></div>
		</TobTab>
		<ScrollY :class="songinfo ? 'contents' : 'content'" ref="scroll" 
		:probe-type="3"
		:pull-up-load="true"
		horizontal="horizontal"
		>
		<HomeSwiper></HomeSwiper>
		<HomeCategory></HomeCategory>
		<HomeSong></HomeSong>
		<HomerAnking></HomerAnking>
		</ScrollY>
    </div>
</template>

<script>
  //首页轮播图组件
  import HomeSwiper from './components/HomeSwiper.vue'
  //首页推荐内容组件
  import HomeCategory from './components/HomeCategory.vue'
  //歌单组件
  import HomeSong from './components/HomeSong.vue'
  //歌曲排行榜组件
  import HomerAnking from './components/HomeRanking.vue'
  import TobTab from '@/components/TobTab'
  //自定义滚动组件
  import ScrollY from '@/components/ScrollY'
  //引入混入事件，提高事件方法的复用性
  import {itemListenerMixin} from '@/common/mixin'
  import {mapGetters} from 'vuex'
  export default {
    name: 'HomeIndex',
	data(){
		return {
			value:null,
			width:0
		}
	},
	computed:{
       ...mapGetters([
            'songinfo'
        ]),
	},
	//混入事件
	mixins:[itemListenerMixin],
	components:{
		HomeSwiper,
		HomeCategory,
		HomeSong,
		HomerAnking,
		TobTab,
		ScrollY,
	},
	// 进入页面时刷新滚动的区域，这里注意
	// activated和deactivated需要再keep-alive缓存区当中
	// 才能触发这两个生命周期函数
	activated(){
      this.$refs.scroll.refresh()
    },
    deactivated(){
	//   离开页面时通过事件总线$off关闭itemImageLoad事件的回调函数
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    }
  }
</script>

<style scoped lang="less">
 .home{
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
 }
 .iconfont{
	 font-size: 32px;
 }
  .content{
	 position: absolute;
	 width: 100%;
	 top: 60px;
	 bottom: 50px;
	 left: 0;
	 right: 0;
	 z-index: -1;
	 padding: 0 10px;
 }
 .contents{
     position: absolute;
	 width: 100%;
	 top: 60px;
	 bottom: 100px;
	 left: 0;
	 right: 0;
	 z-index: -1;
	 padding: 0 10px;
 }
</style>