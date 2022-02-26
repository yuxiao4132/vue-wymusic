<template>
	<div class="audioinfo">
	   <div class="songinfo" @click="getsong" v-if="songinfo">
          <img :src="songinfo.imgurl"/>
          <span class="title">{{songinfo.title}}</span>
          <span class="margin">-</span>
          <span class="name">{{songinfo.name}}</span>
       </div>
       <div v-else></div>
       <div class="stop">
          <span @click="bofang" :class="getisbofang ? 'iconfont icon-zanting' : 'iconfont icon-bofang' "></span>
          <span class="iconfont icon-daohang"></span>
       </div>
    </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    name: 'audioinfo',
	data(){
	  return {
        
      }
	},
    mounted(){
       //console.log(this.songinfo)
    },
    methods:{
        ...mapMutations(['isbofang']),
        bofang(){
          this.isbofang()
        },
        getsong(){
          this.$store.state.ishome=true
          this.$router.push('/song')
        }
    },
    computed:{
         ...mapGetters([
            'songinfo',
            'getisbofang',
            'currentindex',
            'songlist',
            'getsongid'
        ]),
    }
  }
</script>

<style scoped lang="less">
 .audioinfo{
     display: flex;
     position: fixed;
     bottom: 50px;
     align-items: center;
     width: 100%;
     background-color: #fff;
 }
 .audioinfo>div{
     padding:  0 15px;
 }
 .songinfo{
     width: 100%;
     height: 50px;
     display: flex;
     align-items: center;
 }
 .songinfo img{
     width: 50px;
     height: 50px;
     border-radius: 50%;
 }
 .title{
     font-size: 15px;
     margin-left: 10px;
     text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
 }
 .name{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
 }
 .margin{
     margin: 0 3px;
 }
 .name,.margin{
    font-size: 13px;
    font-size: #ccc;
 }
 .stop span:first-child{
     margin-right: 10px;
 }
 .stop span{
     font-size: 25px;
 }
</style>