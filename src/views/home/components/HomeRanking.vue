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
  import {getranking,rankingid} from '@/api/home'
  import HomeSongItem from './HomeSongItem.vue'
  export default {
    name: 'HomerAnking',
	data(){
		return{
			ankinglist:[],
			titlelist:null,
			rankinglist:[]
		}
	},
	created() {
		//执行函数拿到数据赋值
		this.getrankingid()
		//this.getankinglist()
	},
	mounted() {
		
	},
	components:{
		HomeSongItem
	},
	methods:{
	//获取歌曲排行榜的数据
     async getrankingid(){
		 const result = await rankingid()
		 let index=0
		 while(index<5){
			//  this.rankinglist.push(result.list[index++].id)
			 try{
				if(this.ankinglist.length===5){
					return
				}
                const data=await getranking({id:result.list[index++].id})
				//console.log(data)
				let topListItem={name:data.playlist.name,tracks:data.playlist.tracks.splice(0,3)}
				this.ankinglist.push(topListItem)
				//console.log(this.ankinglist.length)
			 }catch(err){
                // console.log(err)
			 } 
		 }
		//console.log(this.ankinglist)
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