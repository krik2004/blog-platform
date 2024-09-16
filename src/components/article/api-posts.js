import { baseApi } from '../../shared/apiSlice'
export const articleApi = baseApi.injectEndpoints({
	endpoints: create => ({
		getArticle: create.query({
			query: slug => {
				const token = localStorage.getItem('user.token')
				return {
					url: `/articles/${slug}`,
					headers: {
						...(token ? { Authorization: `Bearer ${token}` } : {}),
					},
				}
			},
			providesTags: ['article'],
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
			invalidatesTags: ['articles'],
		}),

		favoriteArticle: create.mutation({
			query: slug => ({
				url: `/articles/${slug}/favorite`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('user.token')}`,
				},
			}),
			invalidatesTags: ['article', 'articles'],
		}),

		unfavoriteArticle: create.mutation({
			query: slug => ({
				url: `/articles/${slug}/favorite`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('user.token')}`,
				},
			}),
			invalidatesTags: ['article', 'articles'],
		}),
	}),
	overrideExisting: true,
})
