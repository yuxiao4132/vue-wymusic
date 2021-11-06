import {request} from '@/utils/request2'


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