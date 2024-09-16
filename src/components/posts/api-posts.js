import { baseApi } from '../../shared/apiSlice'
export const postsApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getPosts: build.query({
			query: ({ limit, offset }) => {
				const token = localStorage.getItem('user.token')
				return {
					url: `/articles?limit=${limit}&offset=${offset}`,
					headers: {
						...(token ? { Authorization: `Bearer ${token}` } : {}),
					},
				}
			},
			providesTags: ['articles'],
		}),
	}),

	overrideExisting: true,
})
