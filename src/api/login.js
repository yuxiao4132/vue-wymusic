import {request} from '@/utils/request'

// export const getvercode=params=>{
// 	return request({
// 		method:'GET',
// 		url:'/captcha/sent',
// 		params
// 	})
// }

export const getphone=params=>{
	return request({
		method:'GET',
		url:'/login/cellphone',
		params
	})
}

export const getuserdata=params=>{
	return request({
		method:'GET',
		url:'/user/detail',
        params
	})
}

export const user= params =>{
	return request({
		method:"GET",
		url:"/user/detail",
		params
	})
}

export const getmysong= params =>{
	return request({
		method:"GET",
		url:"/user/record",
		params
	})
}