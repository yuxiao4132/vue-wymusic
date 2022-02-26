<template>
	<div class="login-container">
		<!-- 导航栏 -->
	   <TobTab class="tobtab">
			<div slot="left"><span @click="back()" class="iconfont icon-fanhui"></span></div>
			<div slot="center" class="center">
				<p>登录/注册</p>
			</div>
			<div slot="right"></div>
		</TobTab>
		
		<!-- 登录表单 -->
		<van-form @submit="onLogin" :show-error="false" 
		:show-error-message="false"
		validate-first
		ref="loginform"
		@failed="onFailed">
		  <van-field
		   v-model="user.mobile"
		   icon-prefix="toutiao"
		   left-icon="shouji"
		   placeholder="请输入手机号"
		   :rules="formRules.mobile"
		   name="mobile"
       class="info"
		  />
          <van-field
            v-model="user.code"
            clearable
			icon-prefix="toutiao"
			left-icon="yanzhengma"
			placeholder="请输入密码"
			name="code"
      class="info"
          >
		  </van-field>
		  <div class="login-btn-wrap">
		   <van-button
		    class="login-btn" type="info" block
			>登录</van-button>
		  </div>
        </van-form>
    </div>
</template>

<script>
	import {getphone} from '@/api/login'
	import {getuserdata} from '@/api/login'
    import TobTab from '@/components/TobTab'
	
  export default {
    name: 'LoginIndex',
	data(){
		return{
			user:{
				mobile:'',
				code:''
			},
			formRules:{
				mobile:[
					{ required: true, message: '请填写手机号' },
					{pattern:/^1[3|5|7|9]\d{9}$/,message:'手机号格式错误'}
				]
			},
			isCountDownShow:false,
			isSendSmsLoading:false
		}
	},
  components:{
    TobTab
  },
	methods:{
		back(){
          this.$router.push('/my')
		},
		async onLogin(){
			this.$toast.loading({
			  message: '加载中...',
			  forbidClick: true,
			  duration:0
			})
			try{
		  const data=await getphone({
          phone:this.user.mobile,
          password:this.user.code
        })
		console.log(data)
		this.$store.state.userid=data.account.id
		this.$store.state.isLogin=true
		this.$store.state.token=data.token
		window.localStorage.setItem('userid',data.account.id)
		const userinfo={
			userimg:data.profile.avatarUrl,
			username:data.profile.nickname
		}
        this.$store.state.userinfo=userinfo
		// this.userdata(account.id)
        window.localStorage.setItem('token',data.token)
				this.$toast.success('登录成功')
				this.$router.push('/')
			}
			catch(err){
				this.$toast.fail('登录失败,手机号或密码错误')
			}
		},
	// 	async userdata(userid){
    //        const {profile}=await getuserdata({uid:userid})
		   
    //    },
		onFailed(error){
			if(error.errors[0]){
				this.$toast({
					message:error.errors[0].message,
					position:'top'
				})
			}
		}
	}
  }
</script>

<style scoped lang="less">

 .login-container{
	   background-color: #de2e1f;
     height: 100vh;
     display: flex;
     flex-direction: column;
	 }
   .tobtab{
     display: flex;
     justify-content: space-between;
     padding:0 20px;
     color:#fff;
     margin: 10px 0;
   }
   .icon-fanhui{
     font-size: 18px;
   }
   .center{
     font-size: 20px;
   }
    .van-nav-bar{
     background-color: #de2e1f;
    }
    .van-cell{
     background-color: #de2e1f;  
    }
    .send-btn{
		 width: 78px;
		 height: 23px;
     font-size: 10px !important; 
    }
		 .van-button__text{
      color: #cccccc !important;  
		 }
	 .login-btn-wrap{
		 padding: 26px 16px;
	 }
   .login-btn{
			 background-color: #fff;
       font-size: 18px;
			 border:none;
		 }
    
</style>