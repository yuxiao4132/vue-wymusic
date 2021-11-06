<template>
  <div id="app">
   <keep-alive exclude="SheetIndex,sheetcomment,floor,VideoIndex">
	   <router-view/>
   </keep-alive>
   <AudioIndex
     v-show="false"
		 ref="audio" 
		 :musrcurl="musicurl">
	 </AudioIndex>
  </div>
</template>

<style>

</style>

<script>
  import AudioIndex from '@/components/audio'
  import {mapGetters} from 'vuex'
  export default {
	  name:'App',
	  components:{
		 AudioIndex
	  },
    watch:{
       'getisbofang':{
		   handler:function(val){
			    if(val){
            this.$refs.audio.startmusic()
          }else{
            this.$refs.audio.stopmusic()
          }
		   }
	   }
	},
    computed:{
       ...mapGetters([
            'musicurl',
            'getisbofang'
        ]),
	}
  }
</script>


