<template>
	<div class="sheetsong">
		<div class="all">
			<div class="allleft">
				<span class="iconfont icon-24gf-playCircle"></span>
				<span class="bofang">播放全部</span>
				<span class="length">{{songlist.length}}</span>
			</div>
			<div class="allright">
				<span class="iconfont icon-xiazai"></span>
				<span class="iconfont icon-xuanze"></span>
			</div>
		</div>
		<div class="sheetitem" v-for="(item,index) in songlist"
		@click="getsong(index)">
		  <div class="left">
			<div v-if="item.al">
				<span v-if="index===currentindex" class="iconfont icon-yinpin"></span>
				<span v-else class="index">{{index |  indexadd}}</span>
			</div>
			<div class="songcontent">
				<p>{{item |  getzhuanji}}</p>
				<div>
					<span>{{item |  getauth}}</span>
					<span>-</span>
					<span>{{item |  getname}}</span>
					<!-- <span class="content">{{item.ar[0].name}}</span>
					<span>-</span>
					<span class="content">{{item.al.name}}</span> -->
				</div>
			</div>
		  </div>
		  <div class="right">
			  <span class="iconfont icon-shipin"></span>
			  <span class="iconfont icon-gengduo-shuxiang"></span>
		  </div>
		</div>
    </div>
</template>

<script>
 
  import {mapGetters} from 'vuex'
  // import {SongIndex} from ''
  export default {
    name: 'SheetSong',
	data(){
		return {
			yinping:null,//是否为选中当前播放音乐的标识
			id:null
		}
	},
	filters:{
		//过滤器,接受传进来的参数。返回需要做相应处理判断的值
		getname:function(value){
			return value.al ? value.al.name : value.song.al.name
		},
		getauth:function(value){
			return value.al ? value.ar[0].name : value.song.ar[0].name
		},
		getzhuanji:function(value){
			return value.al ? value.name : value.song.name
		},
		indexadd:function(value){
			return ++value
		}
	},
	computed:{
       ...mapGetters([
            'getissheet',
			'currentindex'
        ]),
	},
	mounted(){
		if(this.$route.name.name=='sheet'){
			if(this.getissheet && this.$route.params.id===this.$store.state.sheetid){
			  this.$store.state.currentindex=this.$store.state.currentindexs
			}else{
			  this.$store.state.currentindex=null
			}	
		}
	},
	// beforeDestroy(){
		
	// 	if(this.$store.state.currentindex){
    //        this.$store.state.currentindexs=currentindex
	// 	}
	// 	console.log(this.$store.state.currentindexs)
	// },
	props:{
		songlist:{
			type:Array,
			required:true
		},
		sheetid:{
			type:[Number,String],
			default:null
		}
	},
	methods:{
		getsong(index){
			//跳转时重置歌单内容和索引,并且本地储存离开时歌单的id
			//这边-1是索引为1开始,数组索引为0开始
			this.$store.state.currentindex=index
			this.$store.state.currentindexs=index
			this.$store.state.songlist=this.songlist
			this.$store.state.ishome=false
			// console.log(index)
			// console.log(this.songlist[index])
			this.$store.state.songid=this.songlist[index].song ? this.songlist[index].song.id : this.songlist[index].id
			//console.log(this.songlist[index].song.id)
			//console.log(this.songlist[index-1].song)
			//console.log(this.songlist[index].song.id
			this.$store.state.isbofang=true
			if(this.songlist[index].song){
               this.$store.state.issheet=false
			}else{
			   this.$store.state.issheet=true
			}
		
			this.$store.state.sheetid=this.$route.params.id
			this.$router.push('/song')
			
		}
	}
  }
</script>

<style scoped lang="less">
 .all{
	 display: flex;
	 justify-content: space-between;
	 height: 50px;
	 align-items: center;
 }
 .icon-24gf-playCircle{
	 font-size: 25px;
	 color: #ff443b;
	 padding-right: 10px;
	 position: relative;
	 top: 4px;
 }
 .bofang{
	 font-size: 14px;
	 padding-right:5px;
 }
 .length{
	 font-size: 13px;
	 color: #CCCCCC;
 }
 .icon-xiazai,.icon-xuanze{
	 font-size: 18px;
 }
 .sheetsong{
	 padding: 0 10px;
 }
 .sheetitem{
	 display: flex;
	 padding: 10px 0;
 }
 .left{
	display: flex;
	 font-size: 14px;
	 flex: 1;
	 white-space: nowrap;
	 overflow: hidden;
	 text-overflow: ellipsis;
 }
 .right{
	 // flex: 1;
	 display: flex;
	 justify-content: space-around;
	 width: 100px;
	 padding-left: 15px;
 }
 
 .allright{
	display: flex;
	justify-content: space-around;
	width: 100px;
	padding-left: 15px; 
 }
 .songcontent{
	 padding-left: 15px;
 }
 .icon-yinpin{
	 font-size: 20px;
	 color: crimson;
	 line-height: 40px;
 }
 .index{
	font-size: 18px;
	line-height: 40px; 
 }
</style>