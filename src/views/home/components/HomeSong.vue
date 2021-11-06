<template>
	<div class="homesong">
		<div class="recommend">
			<div class="left">
				<h5>推荐歌单</h5>
			</div>
			<div class="right">
				<p>更多></p>
			</div>
		</div>
		
		  <div class="recommendsong">
			<div class="item" v-for="(item,index) in recommendlist"
			     :key="index"
				 @click="itemClick(index)">
				<img :src="item.picUrl"/>
				<p>{{item.name}}</p>
			</div>
		</div>
    </div>
</template>

<script>
  import {getrecommend} from '@/api/home'
  export default {
    name: 'HomeSong',
	data(){
		return{
		 recommendlist:null,
		 index:null
		}
	},
	created() {
		this.getrecommendsong()
	},
	methods:{
		async getrecommendsong(){
			const data=await getrecommend({limit:10})
			this.recommendlist=data.result
			// console.log(this.recommendlist)
		},
		//点击实现路由跳转
		itemClick(index){
			window.localStorage.setItem('sheetid',this.recommendlist[index].id)
			this.$router.push('/sheet/'+this.recommendlist[index].id)
		}
	}
  }
</script>

<style scoped lang="less">
 .homesong{
	 margin-top: 50px;
 }
 .recommend{
	 height: 40px;
	 display: flex;
	 justify-content: space-between;
	 line-height: 40px;
 }
 .right{
	 border: 1px solid #CCCCCC;
	 border-radius:10px;
	 height: 20px;
	 padding: 3px 10px;
	 font-size: 14px;
	 position: relative;
	 top: 10px;
 }
 .right p{
	 position: relative;
	 bottom: 13px;
 }
 .recommendsong{
	 display: flex;
	 margin-top: 10px;
	 overflow-x: auto;
 }
 .recommendsong::-webkit-scrollbar {
   width: 0;
 }
 .recommendsong>div:not(:first-child){
	padding-left: 10px;
}
 .recommendsong img{
	 width: 110px;
	 height: 110px;
	 border-radius: 10px;
 }
 .recommendsong p{
	 font-size: 14px;
 }
</style>