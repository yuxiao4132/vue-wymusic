<template>
 <div class="songindex" v-if="songinfo">
	 <TobTab class="tobtab">
	 			<div 
				class="left" 
				slot="left"
				@click="comeback"><span class="iconfont icon-31xiala"></span></div>
	 			<div class="center" slot="center">
	 				<p class="top">{{songinfo.songs[0].name}}</p>
					<p class="bottom">{{songinfo.songs[0].ar[0].name}}</p>
	 			</div>
	 			<div class="right" slot="right"><span class="iconfont icon-fenxiang"></span></div>
	 </TobTab>
	 <div class="lyric" @touchmove="touchmove" ref="lyrics" v-if="lyric" @click="lyricclick">
		<div class="lyriclist" ref="lyriclist">
			<p class="lyricp" v-for="(item,index) in lyricvalue" :class="{lyricpadding : index==lyriclength}" ref="lyric">
               {{item.lyric}}
			</p>
		</div>
	 </div>

	 <div class="imgdetail" v-else @click="lyricclick">
		 <div class="babing" ref="babing" :class="getisbofang ? 'babingzhuan':'' ">
			 <img src="../../static/images/needle.png" />
		 </div>
		 <div class="heijiao">
		   <img class="disc"  src="../../static/images/disc.png" />
		   <img class="touxiang" :class="getisbofang ? 'animation':''" :src="songinfo.songs[0].al.picUrl">
		 </div>
	 </div>
	
	 <div class="nabbar">
		 <div class="navbarinfo">
			 <span class="iconfont icon-aixin"></span>
			 <span class="iconfont icon-xiazaidownload140"></span>
			 <span class="iconfont icon-changge"></span>
			 <span @click="songclick" class="iconfont icon-pinglun">
				  <!-- <span class="pingcount">{{getsongping}}</span> -->
				  <span class="pingcount">{{songping | luncount}}</span>
			 </span>
			 <span class="iconfont icon-gengduo-shuxiang"></span>
		 </div>
		 <AudioIndex ref="audio">
		 </AudioIndex>
		 <div class="songset">
			 <span class="iconfont icon-suiji"></span>
			 <span @click="pern" class="iconfont icon-shangyishoushangyige"></span>
			 <span @click="bofang" :class="getisbofang ? 'iconfont icon-zanting' : 'iconfont icon-bofang' "></span>
			 <span @click="next" class="iconfont icon-xiayigexiayishou"></span>
			 <span class="iconfont icon-daohang"></span>
		 </div>
		 <!-- <p>{{getlyric}}</p> -->
	 </div>
 </div>
</template>

<script>
  import $ from 'jquery'
  import {mapGetters,mapMutations,mapState} from 'vuex'
  import TobTab from '@/components/TobTab'
  import AudioIndex from '@/components/audio'
  import ScrollY from '@/components/ScrollY' 
  export default {
    name: 'SongIndex',
	data(){
		return {
			index:null,
			name:null,
			title:null,
			imgurl:null,
			musicurl:'',
			songlength:null,
			pingcount:null,
			lyric:false,
			lyriclist:[],
			lyricindexlist:[],
			isActive:true,
			transform:0,
			timearr:0,
			scrollflag:true,
			scrolltime:null,
			height:0,
			lyriclength:0
		}
	},
	activated(){
		this.lyric=false
	},
	computed:{
	   ...mapState([
		   'songping'
	   ]),
       ...mapGetters([
			'currentindex',
			'songlist',
			'getisbofang',
			'songinfo',
			'getsongid',
			'getishome',
			'getlyric',
			'gettime',
			'getsongping'
        ]),
	    lyricvalue(){
           let lyricstring=this.getlyric.split("\n")
		   for(let i=0;i<lyricstring.length;i++){
			   const lyricafter = lyricstring[i].indexOf("]")
			   const lyricfront = lyricstring[i].indexOf("[")
			   const index = lyricstring[i].substring(lyricfront+1,9)
			   const value = lyricstring[i].substring(lyricafter+1,lyricstring[i].length)
			    const fen=index.slice(1,2)
				const miao=index.substring(3,4)
				if(miao<1 && fen<1){
					index=index.substring(4,index.length)
				}else if(fen<1){
					index=index.slice(3,index.length)
				}else if(fen>=1){
					index=(fen*60)+Number(index.slice(3,index.length))
				}
			    this.lyriclist[i]={
				   flag:index,
				   lyric:value
			    }
		   }
		   
		   this.lyriclength=this.lyriclist.length-1
		//    console.log(this.lyriclength)
		   return this.lyriclist
	   }
	},
	watch:{ 
	   //当播放时间发生改变就执行下面逻辑保证准确性
       gettime(val){
		//    console.log(val)
		  if(this.lyric){//当我展示了歌词模板才执行
           const timearr=[]//播放了多少条歌词的数组
		//    console.log(this.lyriclist[this.timearr-1])
		   for(let i=0;i<this.lyriclist.length-1;i++){
			   if(val>this.lyriclist[i].flag){
				//当前正在播放的句子变黄,就是播放了歌词的数组里面最大的那一个
				this.$refs.lyric[i].style.color='yellow'
				//添加到已播放的数组里面
				 timearr.push(this.$refs.lyric[i])
			   }else{
				   //还没有播放过的全部变白
				 this.$refs.lyric[i].style.color='white'
			   }
		   }
		   //设置播放了多少条歌词的长度,也告诉我当前播放的是第几条歌词
		    this.timearr=timearr.length
			// console.log(this.lyriclist[this.timearr-1])
           //这里是把所有已经播放完的歌词变白,以保持只有我当前正在播放的歌词变黄
           for(let i=0;i<this.timearr-1;i++){
			   this.$refs.lyric[i].style.color='white'
		   }
		 }  
	    },
		getlyric(val){
           this.lyriclist=[]
		},
		//这里是当我们的已播放歌词长度发生改变的时候,
		//设置新的当前正在播放的歌词和播放了多少条歌词相对应的translateY
		//让其滚动区域,和正在播放的歌词显示在可视区域范围之内
		timearr(val){
			this.height = this.$refs.lyriclist.offsetHeight/this.lyricvalue.length-1.5
			//在这里获取意味着长度发生变化就要滚动,也就表明lyricvalue数据加载完毕歌词已经渲染出来了
			//所以在滚动的时候就可以获取滚动的高度
			if(this.scrollflag){
				$(this.$refs.lyrics).animate({scrollTop: `${this.height*val}px`}, 500)
			}
		}
	},
	components:{
		TobTab,
		AudioIndex,
		ScrollY
	},
	filters:{
		luncount:function(value){
            if(value>999 && value<10000){
				return '999+'
			}else if(value>9999){
				return parseInt(value/10000)+'w'
			}else{
				return value
			}
		}
	},
	methods:{
		...mapMutations(['addmodify','reducemodify','isbofang']),
		comeback(){
		  this.$router.back()
		},
		touchmove(event){
			this.scrolltime=null
			this.scrollflag=false
			this.scrolltime=setTimeout(()=>{
				this.scrollflag=true
			},4000)
		},
		lyricclick(){
            this.lyric=!this.lyric
			//this.height = this.$refs.lyriclist.offsetHeight/this.lyricvalue.length-1.2
			if(this.lyric){
				this.$nextTick(()=>{
				   $(this.$refs.lyrics).animate({scrollTop: `${this.height*this.timearr}px`}, 0)
			    })
			}
		},
		pern(){
			clearTimeout(this.scrolltime)
			this.scrollflag=true
			this.timearr=0
			this.height=0
			this.$store.state.isbofang=true
			this.reducemodify()
			// console.log(this.state.currentindex)
			//console.log(this.currentindex)
			this.$store.state.songid=this.songlist[this.currentindex].song ? this.songlist[this.currentindex].song.id : this.songlist[this.currentindex].id
		},
		next(){
			clearTimeout(this.scrolltime)
			this.scrollflag=true
			this.timearr=0
			this.height=0
			this.$store.state.isbofang=true
			this.addmodify()
			// console.log(this.currentindex)
			// this.$store.state.currentindex+=1
			//console.log(this.$store.state.currentindex)
			// console.log('!!!')
			this.$store.state.songid=this.songlist[this.currentindex].song ? this.songlist[this.currentindex].song.id : this.songlist[this.currentindex].id
		},
		bofang(){
			console.log(this.$refs.lyrics)
			// console.log(this.lyriclist.length)
			this.isbofang()
		},
		songclick(){
			this.$store.state.commenttype=0
			//console.log(this.songinfo)
			this.$store.state.commentinfo={
				img:this.songinfo.songs[0].al.picUrl,
				title:this.songinfo.songs[0].name,
				name:this.songinfo.songs[0].ar[0].name
			}
			this.$router.push('/comment/'+this.getsongid)
		}
	}
  }
</script>

<style scoped>
	.lyricp{
		height: 30px;
		line-height: 30px;
	}
	.lyricpadding{
		padding-bottom: 190px;
	}
  .songindex{
	  padding: 0 10px;
	  background-color: #C0C0C0;
	  width: 100%;
	  height: 100vh;
	  display: flex;
	  flex-direction: column;
	  position: relative;
  }
  .active{
	  color:yellow !important;
	  font-size:21px !important;
  }
  .content{
	  position: absolute;
	  left: 0;
	  right: 0;
	  top: 44px;
	  bottom: 320px;
	  /* z-index: -1; */
  }
  .tobtab{
	  display: flex;
	  justify-content: space-between;
	  margin-top: 10px;
  }
  .tobtab span{
	  font-size: 28px;
	  color: #fff;
  }
  .center{
	  text-align: center;
  }
  .center .top{
	 font-size: 15px;
     color: #fff;
     padding: 0 15px;
  }
  .center .bottom{
	  font-size: 14px;
	  color: #002752;
	  margin-top: 10px;
  }
  .imgdetail{
	 height: 550px;
	 margin: 0 auto;
	 display: flex;
	 flex-direction: column;
	 justify-content: center;
  }
  .lyric{
	  height: 550px;
	  overflow: auto; 
	  font-size: 18px;
	  text-align: center;
  }
  .lyriclist{
     transition: transform 1s;
	 position: relative;
	 top: 320px;
  }
  .lyriclist p{
	  color: #fff;
	  margin: 15px 0;
  }
  .lyric::-webkit-scrollbar {
      width: 0;
	  height: 100px;
   }
  .disc{
	  width: 300px;
	  height: 300px;
  }
  .heijiao,.babing{
	  text-align: center;
  }
  .heijiao{
	  position: relative;
	  top: -40px;
	  width: 300px;
	  height: 300px;
  }
  .animation{
	 animation: disc 4s linear infinite;
	 animation-delay: 1s; 
  } 
  .babing{
	 position: relative;
	 top: 20px;
	 left: 30px;
	 transform-origin:30px 0;
	 transform: rotateX(-40deg);
	 transition: transform 1s;
	 z-index: 9;
	 transform: translateY(0)
  }
  .babingzhuan{
	transform: rotateX(0deg); 
  }
  .needleRotate{
	 transform:rotateX(0deg)
  }
  .touxiang{
	  width: 200px;
	  height: 200px;
	  position: absolute;
	  border-radius: 50%;
	  top: 50px;
	  left: 50px;
  }
  .babing img{
	  width: 120px;
	  height: 140px;
  }
  .nabbar{
	 margin:30px 0px;
  }
  .nabbar span{
	  font-size: 26px;
	  color: #fff;
  }
  .navbarinfo{
	  display: flex;
	  justify-content: space-around;
  }
  .songset{
	  display: flex;
	  justify-content: space-around;
	  line-height: 40px;
  }
  .icon-bofang,.icon-zanting{
	  font-size: 40px !important;
  }
  .icon-pinglun{
	  position: relative;
  }
  .pingcount{
	  position: absolute;
	  font-size: 16px !important;
	  top: -10px;
	  right: -28px;
	  z-index: 99;
  }
 @keyframes disc {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
