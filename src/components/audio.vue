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
      		<div class="songlength" ref="product">
      		  <div ref="dongtai" class="songgettime">
      				<div></div>
      		  </div>
      		</div>
         <span class="jieshu">{{showduration}}</span>
      </div>
	  
    </div>
</template>

<script>
  import {getmusicurl} from '@/api/song'
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    name: 'AudioIndex',
	data(){
		return {
			songlength:null,
			duration:null,
			time:null,
			newvalue:null,
			oldvalue:null,
			miao:0,
			cleartime:null,
			width:null
		}
	},
	 computed:{
		...mapGetters([
            'gettime',
			'getduration',
			'getwidth',
			'getsongid',
			'songlist',
			'currentindex'
        ]),
      showduration(){
		//   if(parseInt(this.duration/60)<10){
		// 	  return this.duration
		//   }
		//   console.log(this.duration/60)
		  let fen=parseInt((this.getduration/60)) < 10 ? '0'+parseInt((this.getduration/60))+':' :  parseInt((this.getduration/60))+':'
		  let ismiao=this.getduration-parseInt((this.getduration/60))*60
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
		 gettime(val, oldVal){//普通的watch监听
            this.miao=val
			let product=this.getwidth/this.getduration
			// console.log(product)
			this.$refs.dongtai.style.width=(val*product)+'px' 
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
		oncanplay(){
			// this.songlength=this.$refs.audio.duration
			this.$store.state.duration=this.$refs.audios.duration
		},
		ended(){
          this.addmodify()
		//   this.$store.state.currentindex
		  this.$store.state.songid=this.songlist[this.currentindex-1].id
		  this.$router.push({
				params:{
					id:this.songlist[this.currentindex-1].id
				}
			})
		},
		durationchange(){
		this.$bus.$on('isbofang',isbofang=>{
			console.log(isbofang)
		   if(isbofang){
				this.startmusic()
			}else{
				this.stopmusic()
			}
	    })
		// this.$bus.$on('songover',()=>{
		// 	this.geturl()
		// })
			//  console.log(this.$refs.product.offsetWidth)
			if(this.$refs.audios.currentTime){
			  this.time=this.$refs.audios.currentTime
              this.$store.state.time=this.$refs.audios.currentTime
			}
		},
		stopmusic(){
			this.$refs.audios.pause()
		},
		startmusic(){
			this.$refs.audios.play()
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