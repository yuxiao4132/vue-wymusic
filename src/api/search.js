import {request} from '@/utils/request'


export const searchhot=()=>{
	return request({
		method:'GET',
		url:'/search/hot/detail'
	})
}

export const searchresult=params=>{
	return request({
		method:'GET',
		url:'/search',
        params
	})
}

export const searchsuggest=params=>{
	return request({
		method:'GET',
		url:'/search/suggest',
        params
	})
}