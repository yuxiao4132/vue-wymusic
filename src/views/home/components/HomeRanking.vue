<template>
	<div class="homeranking">
		<div class="recommend">
			<div class="left">
				<h5>排行榜</h5>
			</div>
			<div class="right">
				<p>更多></p>
			</div>
		</div>
		
		<div class="homesong" >
			<!-- 循环遍历把拿到数据中的每一个item传入给子组件 -->
			<HomeSongItem
			v-for="(item,index) in ankinglist"
			:songitem="item">
			  <p>{{item.name}}</p>
			</HomeSongItem>  
		</div>
    </div>
</template>

<script>
  import {getranking} from '@/api/home'
  import HomeSongItem from './HomeSongItem.vue'
  export default {
    name: 'HomerAnking',
	data(){
		return{
			ankinglist:null,
			titlelist:null
		}
	},
	created() {
		//执行函数拿到数据赋值
		this.getankinglist()
	},
	mounted() {
		// console.log(this.titlelist)
	},
	components:{
		HomeSongItem
	},
	methods:{
	//获取歌曲排行榜的数据
	 async getankinglist(){
		 let index=5
		 let datalist=[]
		 while(index<10){ 
			 index++
			 const data=await getranking({idx:index})
			 let topListItem={name:data.playlist.name,tracks:data.playlist.tracks.splice(0,3)}
			 datalist.push(topListItem)
			 this.ankinglist=datalist
			 // console.log(this.ankinglist)
		 }
		
	  }
	}
  }
</script>

<style scoped lang="less">
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
 .homesong{
	display: flex;
	overflow-y: auto;
	margin-top: 20px;
 }
 .homesong::-webkit-scrollbar {
   width: 0;
 }
</style>