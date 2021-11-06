import {request} from '@/utils/request2'
import {request2} from '@/utils/request'

export const getsheetcomment=params=>{
	return request({
		method:'GET',
		url:'/comment/playlist',
        params
	})
}

export const getsongcomment=params=>{
	return request({
		method:'GET',
		url:'/comment/music',
        params
	})
}

export const commentlike=params=>{
	return request({
		method:'GET',
		url:'/comment/like',
        params
	})
}



export const pinglun=params=>{
	return request({
		method:'GET',
		url:'/comment/floor',
        params
	})
}




export const songping=params=>{
	return request({
		method:'GET',
		url:'/comment/music',
        params
	})
}



