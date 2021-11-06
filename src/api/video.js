import {request} from '@/utils/request'


export const getallmv=params=>{
	return request({
		method:'GET',
		url:'/mv/all',
        params
	})
}

// export const getallmv=params=>{
// 	return request({
// 		method:'GET',
// 		url:'/mv/all',
//         params
// 	})
// }

export const mv=params=>{
	return request({
		method:'GET',
		url:'/mv/url',
        params
	})
}

export const getvideo=params=>{
	return request({
		method:'GET',
		url:'/video/group',
        params
	})
}

