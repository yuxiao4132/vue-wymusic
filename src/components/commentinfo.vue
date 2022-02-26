<template>
	<div class="commentinfo">
      <div class="img">
        <img :src="commentinfo.img"/>
      </div>
      <div class="info">
        <p class="name">{{commentinfo.title}}</p>
        <p class="uname"><span class="by">by</span>&nbsp;{{commentinfo.name}}</p>
      </div>
      <div class="right">
         <span>></span>
      </div>
     </div>
</template>

<script>
  export default {
    name: 'commentinfo',
	  props:{
        commentinfo:{
            type:Object,
            require:true
        }
    },
  }
</script>

<style scoped lang="less">
 .commentinfo{
   display: flex;
   position: relative;
 }
 .commentinfo{
   padding: 0 15px;
 }
 .commentinfo img{
   width: 70px;
   height: 70px;
   border-radius: 5px;
   margin-right: 10px;
 }
 .name{
   font-size: 18px;
 }
 .uname{
   font-size: 14px;
   color: rgb(62, 149, 231);
   margin-bottom: 10px;
 }
 .info{
   display: flex;
   flex-direction: column;
   justify-content: space-between;
 }
 .by{
   color: #000 !important;
 }
 .right{
   position: absolute;
   color: #ccc;
   right: 15px;
   top: 24px;
 }
</style>