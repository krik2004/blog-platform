import { baseApi } from '../../shared/apiSlice'

// const apiKey = window.localStorage.getItem('user.token')
// console.log('в апи кей', apiKey)

export const getUserInfoApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getUserInfo: build.query({
			query: userToken => ({
				url: '/user',
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			}),
		}),
	}),
	overrideExisting: true,
})
