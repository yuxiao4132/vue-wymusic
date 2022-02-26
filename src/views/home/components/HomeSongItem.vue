<template>
	<div class="homesongitem">
	  <div>
	    <div class="spansize">
		<span v-for="(item,index) in songitem.name">{{item}}</span>
		</div>
		<div 
		class="songitem"
		@click="getsong(item,index)"
		v-for="(item,index) in songitem.tracks"
		:key="index">
		 <img :src="item.al.picUrl" @load="imageLoad"/> 
		 <p class="two">{{index |  indexadd}}</p>
		 <p class="three">{{item.name}}</p>
		</div>
	  </div>
    </div>
</template>

<script>
  export default {
    name: 'HomeSongItem',
	data(){
		return{
          
		}
	},
	filters:{
		//过滤器,接受传进来的参数。返回需要做相应处理判断的值
		indexadd:function(value){
			return ++value
		}
	},
	props:{
		//定义接受值得类型
		songitem:{
			type:[Array,Object],
			required:true
		}
	},
	methods:{
	  imageLoad(){
		//   图片加载完毕发送全局事件
			this.$bus.$emit('itemImageLoad')
		},
		getsong(item,index){
			// 点击实现路由跳转,并且重置vuex全局状态的歌单内容,和显示
			// 当前歌单中选择的歌曲
			//console.log(index)
			this.$store.state.currentindex=index
			this.$store.state.songlist=this.songitem.tracks
			this.$store.state.songid=this.songitem.tracks[index].id
			//if(window.localStorage.getItem('songid')!==this.songitem.tracks[index-1].id){
			this.$store.state.isbofang=true
			this.$store.state.issheet=false
			console.log(this.$store.state.currentindex)
			console.log(index)
			//}
			this.$router.push('/song')
		}
	}
  }
</script>

<style scoped lang="less">
 .homesongitem{
	 background-color: #fcfcfc;
 }
 .spansize span{
	 font-size: 18px;
 }
 .songitem{
	 display: flex;
	 width: 300px;
	 margin: 15px 10px;
	 line-height: 50px;
	 // justify-content: space-between;
 }
 .songitem img{
	 width: 50px;
	 height: 50px;
	 margin: 0 20px;
 }
 .songitem p{
	 font-size: 14px;
 }
 .three{
	 margin-left: 20px;
	 white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
	 
 }
 .one{
	 position: absolute;
 }
</style>