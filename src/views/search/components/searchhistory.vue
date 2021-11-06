<template>
	<div class="searchhistory">
      <p class="lishi">历史</p>
      <div  class="history">
           <p @click="historyclick(item)" v-for="(item,index) in historylist" :key="index">
              {{item}}
           </p>
      </div>
      <div @click="deleteclick" class="deletediv">
        <van-icon class="delete" name="delete" color="#afafaf" />
      </div>
    </div>
</template>

<script>
  import { Dialog } from 'vant'
  
  export default {
    name: 'SearchHistory',
    data(){
     return{
         value:''
     }
    },
    props:{
      historylist:{
          type:Array,
          require:true
      }
    },
    created(){
     
    },
    computed:{
	    
	},
    mounted(){
      
    },
    methods:{
      deleteclick(){
    Dialog.confirm({
      message: '确定要清空历史记录吗?',
     }).then(() => {
    this.$emit('deletehistory')
    }).catch(() => {
    return
    });
  },

      historyclick(item){
        this.$emit('gethistory',item)
     },
    },
    components:{
      
    }
  }
</script>

<style scoped lang="less">
  .searchhistory{
    display: flex;
    font-size: 14px;
    padding: 0 10px;
    margin: 10px 0 20px 0;
  }
  .lishi{
    margin-right: 10px;
    white-space: nowrap;
    padding-top: 3px;
  }
  .history{
    display: flex;
    white-space: nowrap;
    overflow-x: auto;
    align-items: center;
  }
  .history::-webkit-scrollbar {
   width: 0;
  }
  .history p{
    background-color:#f4f4f4;
    padding: 3px 10px;
    margin:0 5px;
    border-radius: 10px;
  }
  .deletediv{
    
  }
  .delete{
    font-size: 20px;
    background-color:#fff;
    opacity: .6;
    padding: 3px 0 0 10px;
  }
</style>