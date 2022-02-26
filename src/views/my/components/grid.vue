 <template>
	 <div class="grid">
    <van-grid :border="false" :column-num="4">
      <van-grid-item>
        <div class="item">
          <span class="iconfont icon-bendi gridfont"></span>
          <span>本地/下载</span>
        </div>
     </van-grid-item>
     <van-grid-item>
        <div class="item">
          <span class="iconfont icon-xiazaidownload140 gridfont"></span>
          <span>云盘</span>
        </div>
     </van-grid-item>
     <van-grid-item>
        <div class="item">
          <span class="iconfont icon-gaiicon- gridfont"></span>
          <span>已购</span>
        </div>
     </van-grid-item>
     <van-grid-item>
        <div class="item" @click="gosong">
          <span class="iconfont icon-24gf-playCircle gridfont"></span>
          <span>最近播放</span>
        </div>
     </van-grid-item>
      <van-grid-item>
        <div class="item">
          <span class="iconfont icon-wodehaoyou gridfont"></span>
          <span>我的好友</span>
        </div>
     </van-grid-item>
      <van-grid-item>
        <div class="item">
          <span class="iconfont icon-shoucang gridfont"></span>
          <span>收藏和赞</span>
        </div>
     </van-grid-item>
      <van-grid-item>
        <div class="item">
          <span class="iconfont icon-bokeyuan gridfont"></span>
          <span>我的博客</span>
        </div>
     </van-grid-item>
      <van-grid-item>
        <div class="item">
          <span class="iconfont icon-tianjia gridfont"></span>
          <span>音乐应用</span>
        </div>
     </van-grid-item>
</van-grid>
</div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'Grid',
    data(){
      return {

      }
    },
    computed:{
		  ...mapGetters(['isLogin','getuserinfo'])
	  },
    methods:{
      gosong(){
        if(this.isLogin && this.getuserinfo){
         // console.log('mysong')
          this.$router.push('/mysong')
        }else{
          console.log('mysong2')
          this.$dialog.confirm({
          title: '您还没有登录',
          message: '需要跳转到登录页面吗？',
            }).then(() => {
             this.$router.push('/login')
           })
           .catch(() => {
             return
           });
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .grid{
    padding: 0 10px;
    border-radius: 20px;
  }
  .item{
    display: flex;
    flex-direction:column;
    font-size: 15px;
    text-align: center;
    border-radius: 10px;
  }
  .gridfont{
      font-size: 25px;
      color: #f73d4a;
      margin-bottom: 10px;
  }
</style>