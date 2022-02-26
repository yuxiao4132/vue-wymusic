<template>
	<div class="myindex" :class="songinfo ? 'margin' : ''">
    <ScrollY :class="songinfo ? 'contents' : 'content'" ref="scroll" 
		:probe-type="3"
		:pull-up-load="true"
		>
		 <TobTab class="tobtab">
			<div slot="left"><span class="iconfont icon-daohang"></span></div>
			<div slot="center">
			</div>
			<div slot="right"><span class="iconfont icon-sousuo"></span></div>
		</TobTab>
    
    <TobTab class="userdata" v-if="isLogin && getuserinfo">
			<div slot="left" class="userleft">
        <img :src="getuserinfo.userimg" @load="imageLoad"/>
        <p>{{getuserinfo.username}}</p>
      </div>
			<div slot="right" class="userright"><span class="iconfont icon-arrow-right"></span></div>
		</TobTab>
    
    <TobTab v-else class="userdata" @click.native="$router.push('/login')">
			<div slot="left" class="userleft">
        <span class="iconfont icon-morentouxiang"></span>
        <p>立即登录</p>
        <span class="iconfont icon-arrow-right"></span>
      </div>
		</TobTab>


  <!-- <p v-else>222</p> -->
    <Grid></Grid>

   <div class="sheetlike">
    <TobTab class="userlike">
			<div slot="left" class="userleft">
        <div class="shoucang">
          <span class="iconfont icon-aixin"></span>
        </div>
        <div class="musiclike">
          <p>我喜欢的音乐</p>
          <p>0首</p>
        </div>
      </div>
			<div slot="right" class="userrlikeight">
        <div class="xindong">
          <span class="iconfont icon-aixin"></span>
          <span>心动模式</span>
        </div>
      </div>
		</TobTab>
   </div>

    <van-tabs v-model="active" class="sheet" :border="false">
      <van-tab title="创建歌单">
         <div class="sheetuser">
           <TobTab class="usersheet">
			    <div slot="left" class="sheetleft">
            <p>创建歌单</p>
          </div>
			    <div slot="right" class="sheetright">
            <span class="iconfont icon-zengjia"></span>
            <span class="iconfont icon-gengduo-shuxiang"></span>
          </div>
          </TobTab>
          <div class="userdaochu">
            <div class="daochu">
              <span class="iconfont icon-daoru_o"></span>
            </div>
            <span>一键导入外部的音乐</span>
          </div>
        </div>
      </van-tab>
      <van-tab title="收藏歌单">
        <div class="sheetuser">
           <TobTab class="usersheet">
			    <div slot="left" class="sheetleft">
            <p>收藏歌单</p>
          </div>
			    <div slot="right" class="sheetright">
            <span class="iconfont icon-gengduo-shuxiang"></span>
          </div>
          </TobTab>
          <div class="usernone">
            <span class="none">暂无收藏的歌单</span>
          </div>
        </div>
      </van-tab>
      <van-cell
      v-if="isLogin && getuserinfo"
		  class="logout-cell"
		  @click="onLogout"
		  title="退出登录"/> 
    </van-tabs>
    </ScrollY>
  </div>
</template>

<script>
 import BottomTabbar from '@/components/Tabbar.vue'
 import TobTab from '@/components/TobTab'
 import Grid from './components/grid.vue'
 import ScrollY from '@/components/ScrollY'
 import {mapGetters} from 'vuex'
 import {itemListenerMixin} from '@/common/mixin'
  export default {
    name: 'MyIndex',
    data(){ 
     return{ 
         username:null,
         userimg:null,
         active:0,
         flag:true
     }
    },
    created(){
      
     
    },
    computed:{
		  ...mapGetters(['isLogin','getuserinfo','songinfo'])
	  },
    mounted(){
      
    },
    methods:{
       onLogout(){
         this.$dialog.confirm({
			  title: '退出提示',
			  message: '确认退出吗？',
			}).then(() => {
			   this.$store.state.isLogin=false
         localStorage.removeItem('token');
         localStorage.removeItem('userid');
			  })
			  .catch(() => {
			    // on cancel
			  });
       },
      imageLoad(){
         this.$refs.scroll.refresh()
      }
    },
    components:{
      TobTab,
      Grid,
      BottomTabbar,
      ScrollY
    }
  }
</script>

<style scoped lang="less">
  .logout-cell{
    margin-bottom: 30px;
  }
  .myindex{
    background-color: #eeeaeb;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .margin{
    margin-bottom: 50px;
  }
  .tobtab{
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin: 10px 0;
  }
  .icon-daohang,.icon-sousuo{
    font-size: 25px !important;
  }
  .userdata{
    display: flex;
    line-height: 50px;
    justify-content: space-between;
    padding:0 20px;
    margin: 10px 0 15px 0;
  }
  .userleft{
    font-size: 15px;
    display: flex;
  }
  .userleft img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .userright{
    position: relative;
    top: -4px;
  }
  .sheetlike{
    padding: 0 10px;
    border-radius: 10px;
  }
  .userlike{
    background-color: #fff;
    border-radius: 10px;
    padding:15px 20px;
    display: flex;
    justify-content: space-between;
    margin: 20px 0 20px 0;
  }
  .shoucang{
    width: 45px;
    height: 45px;
    background-color: #9b9b9b;
    border-radius: 10px;
    text-align: center;
    line-height: 45px;
  }
  .musiclike{
    margin-left: 10px;
  }
  .icon-aixin{
    font-size: 30px;
    // color: #fff;
    // background-color: #fff;
  }
  .userrlikeight{
    padding:3px;
    border: 1px solid #cccccc;
    border-radius: 10px;
    position: relative;
    top: 7px;
  }
  .icon-aixin{
    font-size: 18px;
    position: relative;
    top: 3px;
  }
  .xindong{
    position: relative;
    top: -3px;
    font-size: 13px;
  }
  .sheet{
    border-radius: 10px;
    padding: 0 10px;
  }
  .usersheet{
    display: flex;
    justify-content: space-between;
  }
  .sheetuser{
    padding: 10px;
    margin:0 0 20px 0;
    background-color: #fff;
  }
  .sheetleft p{
    font-size: 14px;
  }
  .userdaochu{
    display: flex;
    line-height: 40px;
    padding:10px 0;
  }
  .userdaochu span{
    font-size: 14px;
  }
  .daochu{
    width: 40px;
    height: 40px;
    background-color: #f4f4f4;
    text-align: center;
    border-radius: 5px;
    margin-right: 15px;
  }
  .icon-daoru_o{
    font-size: 25px !important;
  }
  .icon-zengjia{
    margin-right: 15px;
  }
  .sheetright span{
    font-size: 20px;
  }
  .usernone{
    text-align: center;
    line-height: 40px;
    padding:10px 0;
    font-size: 15px;
  }
  .icon-morentouxiang{
    font-size: 45px;
    margin-right: 20px;
  }
.content{
	 position: absolute;
	  left: 0;
	  right: 0;
	  top: 1px;
	  bottom: 55px;
}
.contents{
	 position: absolute;
	  left: 0;
	  right: 0;
	  top: 1px;
	  bottom: 110px;
}
</style>