<template>
	<div class="search">
       <TobTab class="tobtab">
           <div @click="$router.push('/')" slot="left">
               <span class="iconfont icon-fanhui"></span>
           </div>
           <div slot="center">
               <van-search
                  @click="searchclick()"
                  v-model="value"
                  show-action
                  placeholder="请输入搜索关键词"
                  @search="onSearch"
                  @cancel="onCancel"
                  @input="onInput"
                  action-text='取消'
               />
           </div>
           <div slot="right"></div>
       </TobTab>
       <history @gethistory='gethistory'  @deletehistory='deletehistory' :historylist='historylist'></history>
        <div class="hot">
         <searchhot @gethot='gethot'></searchhot>
        </div>
       <searchproposal  v-show="proshow" @propoclick="propoclick" :propo='propolist' class="proposal"></searchproposal>
       <result @resultadd='resultadd' v-show="resultshow" :resultlist="resultlist"
      ></result>
       
    </div>
</template>

<script>
 import TobTab from '@/components/TobTab'
 import searchhot from './components/searchhot.vue' 
 import searchproposal from './components/searchproposal.vue'
 import result from './components/searchresult.vue'
 import history from './components/searchhistory.vue'
 import {searchresult} from '@/api/search'
 import {debounce} from 'lodash'
 export default {
    name: 'MySearch',
    data(){
     return{
         value:'',
         propolist:[],
         limit:15,
         offset:1,
         resultlist:[],
         proshow:false,
         resultshow:false,
         historylist:[]
     }
    },
    watch:{
       value:{
          //通过debounce对搜索函数进行截流操作
         handler: debounce(async function(){
             const {result}=await searchresult({
            limit:10,
            keywords:this.value,
          }) 
          if(result){
            this.propolist=result.songs
          }
           console.log(this.propolist)
          },200) 
       }
    },
    methods:{
     deletehistory(){
       this.historylist=[]
     },
     gethistory(value){
        this.propoclick(value)
     },
     gethot(value){
        this.propoclick(value)
     },
     searchclick(){
        if(this.value!=''){
          this.proshow=true
        }
        this.resultshow=false
     },
     async onInput(){
        if(this.value!=''){
            this.proshow=true 
        }else{
            this.proshow=false
        }
      },
      async resultadd(offset){
          this.offset=offset
          const {result}=await searchresult({
            limit:this.limit,
            keywords:this.value,
            offset:this.offset,
            type:1
         })
          this.resultlist.push(...result.songs)
      },
      async propoclick(value){
        this.value=value
        this.offset=1
        this.$bus.$emit('getvalue',value)
        const {result}=await searchresult({
            limit:this.limit,
            keywords:value,
            offset:this.offset,
            type:1
         })
         this.resultlist=result.songs
         this.proshow=false
         this.resultshow=true
         this.onInput()
        //  this.value=searchText
		  
		const index=this.historylist.indexOf(value)
			 if(index!==-1){
				this.historylist.splice(index,1) 
			 }
		this.historylist.unshift(value)
      },
      async onSearch(){
         this.resultshow=true
         this.proshow=false
         this.offset=1
         this.$bus.$emit('getvalue',this.value)
         const {result}=await searchresult({
            limit:this.limit,
            keywords:this.value,
            offset:this.offset,
            type:1
         })
          this.resultlist=result.songs
          this.onInput()
         const index=this.historylist.indexOf(this.value)
			 if(index!==-1){
				this.historylist.splice(index,1) 
			 }
		this.historylist.unshift(this.value)
      },
      onCancel(){

      }
    },
    components:{
      TobTab,
      searchhot,
      searchproposal,
      result,
      history
    }
  }
</script>

<style scoped lang="less">
 .search{
    //   padding: 0 15px;
 }
 .tobtab{
	 height: 60px;
	 display: flex;
	 align-items: center;
	 justify-content: space-between;
	 background-color: #fff;
	 width: 100%;
     padding: 0 15px;
 }
 .hot{
     padding: 0 15px;
 }
 .proposal{
    //  padding: 0 !important;
 }
</style>