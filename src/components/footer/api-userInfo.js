import { baseApi } from '../../shared/apiSlice'

export const getUserInfoApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getUserInfo: build.query({
			query: userToken => {
				return {
					url: '/user',
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			},
			providesTags: ['user'],
		}),
	}),
	overrideExisting: true,
})
