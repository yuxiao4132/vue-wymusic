<template>
	<div class="audio">
		<!-- controls="controls" -->
	 <audio 
	  ref="audios"
	  autoplay="autoplay"
	  @canplay="oncanplay"
	  @timeupdate="durationchange"
	  @ended="ended"
	  :src="musrcurl"></audio>	
      <div class="songtime">
      	<span class="kaishi">{{showmiao}}</span>
      		<div class="songlength" ref="product" @click="audioclick">
      		  <div ref="dongtai" class="songgettime">
      				<div></div>
      		  </div>
      		</div>
         <span class="jieshu">{{showduration}}</span>
      </div>
	  
    </div>
</template>

<script>
    import {getlyric} from '@/api/song'
  import {mapMutations, mapState} from 'vuex'
  import {songping} from '@/api/comment'
  export default {
    name: 'AudioIndex',
	data(){
		return {
			songlength:null,
			newvalue:null,
			oldvalue:null,
			miao:0,
			cleartime:null,
			musicclick:false
		}
	},
	 computed:{
		...mapState([
			'time',
			'duration',
			'width',
			'songlist',
			'currentindex',
			'songid'
		]),
      showduration(){
		  let fen=parseInt((this.duration/60)) < 10 ? '0'+parseInt((this.duration/60))+':' :  parseInt((this.duration/60))+':'
		  let ismiao=this.duration-parseInt((this.duration/60))*60
          let miao=Number(ismiao)<10 ? '0'+parseInt(ismiao) : parseInt(ismiao)
		  return fen + miao
		  //console.log((this.duration-((this.duration/60).toFixed(0)*60)).toFixed(0))
      },
	  showmiao(){
		  let fen=parseInt((this.miao/60)) < 10 ? '0'+parseInt((this.miao/60))+':' :  parseInt((this.miao/60))+':'
		//   let ismiao=this.miao-parseInt((this.miao/60))*60
		  let miao=this.miao<10 ? '0'+parseInt(this.miao) : parseInt(this.miao)
		  if(this.miao>60){
			  let fenflag=parseInt(this.miao/60)
			// //   miao=(this.miao-fenflag*60)<10 ? '0'+parseInt(this.miao) : parseInt(this.miao)
			//   miao=this.miao-fenflag*60
			  miao=parseInt(this.miao-fenflag*60) <10 ? '0'+parseInt(this.miao-fenflag*60) : parseInt(this.miao-fenflag*60)
		  }
		return fen + miao
	  }
    },
	props:{
		musrcurl:{
			type:String,
			required:false
		}
	},
	watch:{
		//音乐时间this.getwidth/this.getduration 点击位置的宽
		//滚动条的宽
		 time(val, oldVal){//普通的watch监听
            this.miao=val
			let product=this.width/this.duration
			this.$refs.dongtai.style.width=(val*product)+'px' 
		 },
		 currentindex(val){
			 console.log(val)
		 }
	},
	mounted() {
		this.$store.state.width=this.$refs.product.offsetWidth
	},
	destroyed(){
        this.$bus.$off('pern')
		this.$bus.$off('isbofang')
	},
	methods:{
		...mapMutations(['addmodify','reducemodify']),
		async getsongping(){
           const data= await songping({
			   id:this.songid,
		   })
		   this.$store.state.songping=data.total
		},
		async musiclyric(){
            const data = await getlyric({id:this.songid})
			this.$store.state.lyric=data.lrc.lyric
		},
		oncanplay(){
			this.getsongping()
			this.musiclyric()
			this.$store.state.duration=this.$refs.audios.duration
		},
		ended(){
          this.addmodify()
		  this.$store.state.songid=this.songlist[this.currentindex].song ? this.songlist[this.currentindex].song.id : this.songlist[this.currentindex].id
		},
		durationchange(){
              this.$store.state.time=this.$refs.audios.currentTime
			  this.$bus.$on('musrcclick',newwidth=>{
				//求出每1秒移动多少px
				let product=this.width/this.duration
                // console.log(newwidth)
				//求出当前播放了多少秒
				this.$refs.audios.currentTime=newwidth/product;
				//   this.$refs.dongtai.style.width=event.offsetX+'px'
				//  console.log(event.offsetX)
				//  console.log(this.$refs.dongtai.style.width)
				//  console.log(event)
			  })
		},
		stopmusic(){
			this.$refs.audios.pause()
		},
		startmusic(){
			this.$refs.audios.play()
		},
		audioclick(event){
			this.$refs.dongtai.style.width=event.offsetX+'px'
			const newwidth=event.offsetX
			this.$bus.$emit('musrcclick',newwidth)
		}
	}
  }
</script>

<style scoped lang="less">
 .songtime{
 	  display: flex;
 	  justify-content: space-between;
 	  margin: 20px 0;
 }
 .songtime span{
 	  font-size: 12px;
 }
 .songlength{
 	 margin-top: 6px;
 	  width: 270px;
 	  height: 1px;
 	  background-color: #000; 
 	  display: flex;
 	 /* justify-content: flex-end; */
 }
 .songgettime{
 	 width: 0px;
 	 height: 1px;
 	 background-color: #fff; 
 	 position: relative;
 }
 .songgettime>div{
 	  width: 8px;
 	  height: 8px;
 	  border-radius:50%;
 	  background-color: #fff;
 	  position: absolute;
 	  top: -3px;
 	  right: 0;
 }
</style>