import { baseApi } from '../../shared/apiSlice'
export const articleApi = baseApi.injectEndpoints({
	endpoints: create => ({
		getArticle: create.query({
			query: slug => `/articles/${slug}`,
		}),

		deleteArticle: create.mutation({
			query: slug => ({
				url: `/articles/${slug}`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('user.token')}`,
				},
			}),
		}),
	}),
	overrideExisting: true,
})
