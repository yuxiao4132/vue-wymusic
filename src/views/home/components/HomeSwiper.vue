<template>
	<div class="swiper">
		<van-swipe :height="150" class="my-swipe" :autoplay="3000" indicator-color="white">
		  <van-swipe-item
		    class="my-swipe-item"
		    v-for="(item,index) in imglist"
			:key="index"
		  >
			  <img :src="item.imageUrl" @load="imageLoad"/>
		  </van-swipe-item>
		 
		</van-swipe>
    </div>
</template>

<script>
  import {getSwiper} from '@/api/home'
  export default {
    name: 'HomeSwiper',
	data(){
		return {
			imglist:null,
			isLoad:false
		}
	},
	created() {
		this.SwiperImg()
	},
	methods:{
		async SwiperImg(){
			const data = await getSwiper(1)
			this.imglist=data.banners
			// console.log(this.imglist)
		},
		imageLoad(){
			//   图片加载完毕发送全局事件
			this.$bus.$emit('itemImageLoad')
		}
	}
  }
</script>

<style scoped lang="less">
 .swiper{
	 width: 100%;
	 height: 100%;
 }
 .my-swipe{
     color: #fff;
     font-size: 20px;
     text-align: center;
     width: 100%;
	 height: 100%;
   }
  .van-swipe__track img{
	  width: 100%;
	  height: 100%;
  }
  
</style>