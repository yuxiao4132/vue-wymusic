import {request} from '@/utils/request'


export const getsheet=params=>{
	return request({
		method:'GET',
		url:'/playlist/detail',
		params
	})
}

export const getsong=params=>{
	return request({
		method:'GET',
		url:'/song/detail',
		params
	})
}


