import { baseApi } from '../../shared/apiSlice'
export const postsApi = baseApi.injectEndpoints({
	endpoints: build => ({
		getPosts: build.query({
			query: ({ limit, offset }) => `/articles?limit=${limit}&offset=${offset}`,
		}),
	}),
	overrideExisting: true,
})
