import {request} from '@/utils/request2'


export const getmusicurl=params=>{
	return request({
		method:'GET',
		url:'/song/url',
		params
	})
}