<template>
	<div class="searchpropo">
       <div class="propolist">
           <div @click="propoclick(index)" class="info" v-for="(item,index) in propo" :key="index">
               <span class="iconfont icon-sousuo"></span>
               <span>{{item.keyword}}</span>
           </div>
       </div>
    </div>
</template>

<script>
  export default {
    name: 'SearchPropo',
    data(){
     return{
         value:''
     }
    },
    props:{
       propo:{
           type:Array,
           require:true
       }
    },
    
    methods:{
     propoclick(index){
        let value = this.propo[index]
        this.$emit('propoclick',value.keyword)
        // console.log(name+title)
     },
    },
    components:{
      
    }
  }
</script>

<style scoped lang="less">
  .searchpropo{
      background-color: #fff;
      position: absolute;
      top: 50px;
      padding: 0 !important;
    //   height: 100vh;
      width: 100%;
      height:calc(100% - 50px);
  }
  .propolist{
      padding: 0 10px;
  }
  .info{
      font-size: 16px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
  }
  .icon-sousuo{
      margin-right: 10px;
  }
  .name{
      color:rgba(204, 204, 204, 1);
  }
</style>