<template>
 <div class="songindex" v-if="songinfo">
	 <TobTab class="tobtab">
	 			<div 
				class="left" 
				slot="left"
				@click="comeback"><span class="iconfont icon-31xiala"></span></div>
	 			<div class="center" slot="center">
	 				<p class="top">{{songinfo.title}}</p>
					<p class="bottom">{{songinfo.name}}</p>
	 			</div>
	 			<div class="right" slot="right"><span class="iconfont icon-fenxiang"></span></div>
	 </TobTab>
	 
	 <div class="imgdetail">
		 <div class="babing" :class="getisbofang ? 'babingzhuan':'' ">
			 <img src="../../static/images/needle.png" />
		 </div>
		 <div class="heijiao" :class="getisbofang ? 'animation':'' ">
		   <img class="disc" src="../../static/images/disc.png" />
		   <img class="touxiang" :src="songinfo.imgurl">
		 </div>
	 </div>
	 
	 <div class="nabbar">
		 <div class="navbarinfo">
			 <span class="iconfont icon-aixin"></span>
			 <span class="iconfont icon-xiazaidownload140"></span>
			 <span class="iconfont icon-changge"></span>
			 <span @click="songclick" class="iconfont icon-pinglun">
				  <span class="pingcount">{{songinfo.count | luncount}}</span>
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
	 </div>
 </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  import TobTab from '@/components/TobTab'
  import AudioIndex from '@/components/audio'
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
			pingcount:null
		}
	},
	created(){
      window.localStorage.setItem('songid',this.getsongid)
	},
	computed:{
       ...mapGetters([
                'currentindex',
                'songlist',
				'getisbofang',
				'songinfo',
				'getsongid',
				'getishome'
        ]),
	},
	components:{
		TobTab,
		AudioIndex
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
		  if(this.songlist.length<=3){
			 this.$store.state.issheet=false
			 this.$router.push('/')
		  }else if(this.getishome){
             this.$router.push('/')
		  }else if(this.songlist.length>10){
			 this.$store.state.issheet=false
			 this.$router.push('/search')
		  }
		  else{
             this.$router.push('/sheet/'+window.localStorage.getItem('sheetid')) 
		  }
		},
		pern(){
			this.$store.state.isbofang=true
			this.reducemodify()
			this.$store.state.songid=this.songlist[this.currentindex-1].id
			this.$router.push({
				params:{
					id:this.songlist[this.currentindex-1].id
				}
			})

		},
		next(){
			this.$store.state.isbofang=true
			this.addmodify()
			this.$store.state.songid=this.songlist[this.currentindex-1].id
			this.$router.push({
				params:{
					id:this.songlist[this.currentindex-1].id
				}
			})
			// this.$router.push('/song/'+this.songlist[this.currentindex-1].id)
		},
		bofang(){
			this.isbofang()
		},
		songclick(){
			this.$router.push('/songcomment/'+this.$route.params.id)
		}
	}
  }
</script>

<style scoped>
  .songindex{
	  padding: 0 10px;
	  background-color: #C0C0C0;
	  width: 100%;
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  position: relative;
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
	 margin: 0 auto;
	 display: flex;
	 flex-direction: column;
	 justify-content: center;
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
