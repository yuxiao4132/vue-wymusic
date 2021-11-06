import {getuserdata} from '@/api/login'
import store from '@/store/index.js'
export function debounce(func,delay){
        let timer=null
        return function(...args){
          if(timer) clearTimeout(timer)
          timer=setTimeout(()=>{
            func.apply(this,args)
          },delay)
        }
      }

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

export const getItem=name=>{
	const data=window.localStorage.getItem(name)
	try{
		return data
	}catch(err){
		return data
	}
}
// async userdata(userid){
//   const {profile}=await getuserdata({uid:userid})
// const userinfo={
// userimg:profile.avatarUrl,
// username:profile.nickname
// }
//   this.$store.state.userinfo=userinfo
// },


export async function userdata(userid){
  const {profile}=await getuserdata({uid:userid})
  const userinfo={
  userimg:profile.avatarUrl,
  username:profile.nickname
  }
  store.state.userinfo=userinfo
}
