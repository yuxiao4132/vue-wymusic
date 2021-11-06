<template>
	<div class="tabbar">
	  <van-tabbar v-model="active" route active-color="#ee0a24">
	    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
	    <van-tabbar-item icon="play-circle" to="/video">视频</van-tabbar-item>
	    <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
	  </van-tabbar>
    </div>
</template>

<script>
  export default {
    name: 'BottomTabbar',
	data() {
	  return {
	    active:0,
	  }
	}
  }
</script>

<style scoped lang="less">
 .van-tabbar{
	//  margin-top: 20px;
 }
</style>