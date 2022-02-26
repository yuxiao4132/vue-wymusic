import {request} from '@/utils/request'


export const getmusicurl=params=>{
	return request({
		method:'GET',
		url:'/song/url',
		params
	})
}

export const getlyric=params=>{
	return request({
		method:'GET',
		url:'/lyric',
		params
	})
}