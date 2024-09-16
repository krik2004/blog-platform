import { baseApi } from '../../shared/apiSlice'

export const newArticleApi = baseApi.injectEndpoints({
	endpoints: build => ({
		newArticle: build.mutation({
			query: data => ({
				url: '/articles',
				method: 'POST',
				body: JSON.stringify({
					article: data,
				}),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('user.token')}`,
				},
			}),
			invalidatesTags: ['articles'],
		}),
	}),
	overrideExisting: true,
})
