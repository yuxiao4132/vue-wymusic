<template>
	<div class="homecategory">
		<van-grid :border="false">
		  <van-grid-item>
			  <span class="iconfont icon-rili"></span>
			  <div class="cont">
				  <p>每日推荐</p>
			  </div>
		  </van-grid-item>
		  <van-grid-item>
			  <span class="iconfont icon-shouyinji"></span>
			  <div class="cont">
			  	   <p>私人FM</p>
			  </div>
		  </van-grid-item>
		  <van-grid-item>
			  <span class="iconfont icon-gedan"></span>
			  <div class="cont">
			  		<p>歌单</p>
			  </div>
		  </van-grid-item>
		  <van-grid-item>
			  <span class="iconfont icon-paihangbang"></span>
			  <div class="cont">
			  		<p>排行榜</p>
			  </div>
		  </van-grid-item>
		  <van-grid-item>
			  <span class="iconfont icon-zhibo"></span>
			  <div class="cont">
			  		<p>直播</p>
			  </div>
		  </van-grid-item>
		</van-grid>
    </div>
</template>

<script>
  export default {
    name: 'HomeCategory',
  }
</script>

<style scoped lang="less">
  .homecategory{
	  margin-top: 30px;
  }
  /deep/ .van-grid{
	  flex-wrap: nowrap;
	  justify-content: space-between;
  }
  /deep/ .van-grid-item{
	  width: 50px;
	  height: 50px;
	  padding-left: 10px;
  }
  /deep/ .van-grid-item__content{
	  background-color:#ee0a24;
	  border-radius: 50%;
	  width: 50px;
	  height: 50px;
  }
  /deep/ .van-grid span{
	  font-size: 20px;
	  color:#fff;
  }
  /deep/ .van-grid p{
  	  font-size: 13px;
  }
  /deep/ .cont{
	  position: absolute;
	  top: 52px;
  }
</style>