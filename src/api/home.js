import {request} from '@/utils/request'

export const getSwiper=type=>{
	return request({
		method:'GET',
		url:'/banner',
		type
	})
}

export const getrecommend=params=>{
	return request({
		method:'GET',
		url:'/personalized',
		params
	})
}

export const getranking=params=>{
	return request({
		method:'GET',
		url:'/top/list',
		params
	})
}

export const rankingid=()=>{
	return request({
		method:'GET',
		url:'/toplist',
	})
}