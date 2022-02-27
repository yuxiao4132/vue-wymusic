<template>
	<div>
	   <keep-alive>	
		 <router-view></router-view>
	   </keep-alive>
	   <audioinfo v-show="songinfo" ></audioinfo>
	   <BottomTabbar></BottomTabbar>
    </div>
</template>

<script>
  //引入bottom组件并配置再相应的组件中
  import {getsong} from '@/api/sheet'
  import {getmusicurl} from '@/api/song'
  import { Toast } from 'vant'
  import audioinfo from '@/components/audioinfo'
  import BottomTabbar from '@/components/Tabbar.vue'
  import {mapGetters,mapMutations} from 'vuex'
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
		   handler:function(val){
			  this.geturl()
			  this.getsongs()
		   }
	   }
	},
	computed:{
         ...mapGetters([
             'songinfo',
			 'getsongid',
			 'musicurl',
			 'currentindex',
			 'songlist'
        ]),
    },
	methods:{
		...mapMutations(['addmodify']),
		async geturl(){
			const data = await getmusicurl({id:this.getsongid})
			if(data.data[0].url==null){
				Toast.fail('你没有播放权限,为你播放下一首');
				this.addmodify()
				this.$store.state.songid=this.songlist[this.currentindex].song ? this.songlist[this.currentindex].song.id : this.songlist[this.currentindex].id
			}
            this.$store.state.musicurl=data.data[0].url
			console.log(data)
		},
		async getsongs(){
			const data=await getsong({ids:this.getsongid})
			this.$store.state.songinfo=data
		},
	}
  }
</script>

<style scoped lang="less">
 
</style>