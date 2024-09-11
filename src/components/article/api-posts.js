import { baseApi } from '../../shared/apiSlice'
export const articleApi = baseApi.injectEndpoints({
	endpoints: create => ({
		getArticle: create.query({
			query: (slug) => `/articles/${slug}`,
		}),
	}),
	overrideExisting: true,
})