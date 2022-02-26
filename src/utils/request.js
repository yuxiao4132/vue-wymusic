import axios from 'axios'

export function request(config){
  const instance=axios.create({
    // http://123.207.32.32:9001/
    // baseURL:'https://wymusic4132.herokuapp.com/',
    baseURL:' http://123.207.32.32:9001/',
    timeout:5000
  })

 //请求拦截
 instance.interceptors.request.use(config => {
   return config
 },err=>{

 })
 //请求到数据拦截并且返回数据
 instance.interceptors.response.use(res => {
   return res.data
 },err=>{

 })

 return instance(config)
}