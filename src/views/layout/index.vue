<template>
	<div>
	   <keep-alive>	
		 <router-view></router-view>
	   </keep-alive>
	   <audioinfo v-show="songinfo"></audioinfo>
	   <BottomTabbar></BottomTabbar>
    </div>
</template>

<script>
  //引入bottom组件并配置再相应的组件中
  import {getsong} from '@/api/sheet'
  import {getmusicurl} from '@/api/song'
  import {songping} from '@/api/comment'
  import audioinfo from '@/components/audioinfo'
  import BottomTabbar from '@/components/Tabbar.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'LayoutIndex',
	data(){
       return {
		   pingcount:null
	   }
	},
	components:{
		BottomTabbar,
		audioinfo
	},
	watch:{
       'getsongid':{
		   handler:function(){
			//    console.log('???')
			  this.getsongs()
			  this.geturl()
		   }
	   }
	},
	computed:{
         ...mapGetters([
             'songinfo',
			 'getsongid'
        ]),
    },
	methods:{
		async geturl(){
			const data= await getmusicurl({id:this.getsongid})
			this.musicurl=data.data[0].url
			this.$store.state.musicurl=data.data[0].url
			// console.log(this.$store.state.musicurl)
			// console.log(typeof this.musicurl)
		},
		async getsongs(){
			this.getsongping()
			const data=await getsong({ids:this.getsongid})
			const sheetinfo={
				imgurl:data.songs[0].al.picUrl,
				title:data.songs[0].name,
				name:data.songs[0].ar[0].name,
				count:this.pingcount
				// count:this.pingcount
			}
			// this.$store.state.sheetinfo=sheetinfo
			this.$store.state.songinfo=sheetinfo
			// console.log(this.$store.state.songinfo)
			// console.log(data)
		},

		async getsongping(){
			
           const data= await songping({
			   id:this.getsongid,
		   })
		   this.pingcount=data.total
		//    console.log(this.pingcount)
		},
	}
  }
</script>

<style scoped lang="less">
 
</style>