<template>
	<div class="sheetinfo">
	  <div class="boliang">
		  <span class="iconfont icon-24gl-play"></span>
		  <span>{{ info.count |  getcount}}</span>
	  </div>
	  <div class="user-info">
		  <div class="userleft">
			  <img :src="info.imgurl" 
			  @load="imgLoad"
			  @click="getoverlay"/>
		  </div>
		  <div class="userright">
			  <!-- <van-button type="primary" text="显示遮罩层" @click="show = true" /> -->
			  <p @click="getoverlay">{{info.name}}</p>
			  <div class="userrightinfo">
				  <img :src="info.uimgurl"/>
				  <span class="uname">{{info.uname}}</span>
				  <span class="guanzhu">+</span>
			  </div>
			  <p class="description"
			  @click="getoverlay">
			    {{info.description}}
			    <span 
				class="iconfont icon-arrow-right"></span>
			  </p>
		  </div>  
	  </div>
	  <div class="sheetdetails">
		  <div>
			<span class="iconfont icon-tianjia"></span>
		    <span>{{info.sheetdetails}}</span>
		  </div>
		  <div @click="commentclick">
			<span class="iconfont icon-pinglun"></span>
		    <span>{{info.commentCount}}</span>
		  </div>
		  <div>
			<span class="iconfont icon-fenxiang"></span>
		    <span>{{info.shareCount}}</span>
		  </div>
	  </div>
    </div>
</template>

<script>
 import TobTab from '@/components/TobTab'
  export default {
    name: 'SheetInfo',
	data(){
		return{
			profile:null
		}
	},
	filters:{
		//过滤器,接受传进来的参数。返回需要做相应处理判断的值
		getcount:function(value){
			return value>10000 ? parseInt(value/10000)+'万' : value
		}
	},
	props:{
		info:{
			type:Object,
			required:true
		}
	},
	created() {
		// console.log(this.info)
	
	},
	components:{
		TobTab
	}, 
	methods:{
		imgLoad(){
			this.$bus.$emit('itemImageLoad')
		},
		getoverlay(){
			// 发送自定义事件显示遮罩层
			this.$emit('isZindex')
		},
		commentclick(){
			//跳转歌单评论页面
			this.$router.push('/sheetcomment/'+this.$route.params.id)
		}
	}
  } 
</script>

<style scoped lang="less">
  .sheetinfo{
	  background-color: #887469;
	  opacity: .8;
	  padding: 0 15px;
	  position: relative;
  }
  .boliang{
	  position: absolute;
	  font-size: 12px;
	  color: #fff;
	  top: 23px;
	  left: 62px;
	  font-weight: bold;
  }
  .right span:first-child{
	  padding-right: 20px;
  }
  .user-info{
	  display: flex;
	  padding: 20px 0;
  }
  .userleft img{
	  width: 100px;
	  height: 100px;
	  border-radius:10px;
  }
  .userright{
	  width: 240px;
	  font-size: 16px;
	  color: #fff;
	  padding-left: 20px;
  }
  .userright img{
	  width: 30px;
	  height: 30px;
	  border-radius: 50%;
  }
  .guanzhu{
	  border-radius: 10px;
	  background-color: #C0C0C0;
	  padding:0px 10px;
  }
  .userrightinfo{
	  margin-top: 10px;
	  display: flex;
	  align-items: center;
  }
  .uname{
	  margin-left: 10px;
  }
  .description{
	  margin-top: 10px;
	  font-size: 13px;
	  overflow: hidden;
	  text-overflow:ellipsis;
	  white-space: nowrap;
	  position: relative;
	  padding-right: 5px;
  }
  .icon-arrow-right{
	  position: absolute;
	  right: 0px;
	  top: 0px;
  }
  .sheetdetails{
	  display: flex;
	  border-radius: 20px;
	  width: 90%;
	  margin: 0 auto;
	  background-color: #fff;
	  padding: 5px 0px;
	  margin-bottom: 20px;
	  box-shadow: 0px 3px 5px rgba(0,0,0,.4);
	  font-size: 18px;
	  justify-content: space-around;
	  align-items: center;
	  text-align: center;
	  position: relative;
	  top: 10px;
  }
  .sheetdetails>div span:first-child{
	  margin-right: 8px;
  }
  .sheetdetails>div{
	  position: relative;
	  padding: 10px 0;
  }
   .sheetdetails>div:not(:last-child)::after{
	   content: '|';
	   position:absolute;
	   top: 10px;
	   right: -15px;
   }
   .sheetdetails>div:not(:first-child){
	   padding-right: 20px;
   }
   
</style>