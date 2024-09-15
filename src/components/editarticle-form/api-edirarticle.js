import { baseApi } from '../../shared/apiSlice'

export const editArticleApi = baseApi.injectEndpoints({
	endpoints: build => ({
		editArticle: build.mutation({
			query: ({ data, slug }) => {
				console.log('data v push',data)
				return {
					url: `/articles/${slug}`,
					method: 'PUT',
					body: JSON.stringify({
						article: {
							title: data.title,
							description: data.description,
							body: data.body,
							tagList: data.tagList,
						},
					}),
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('user.token')}`,
					},
				}
			},
		}),
	}),
	overrideExisting: true,
})
