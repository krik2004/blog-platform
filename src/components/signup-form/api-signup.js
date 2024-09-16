import { baseApi } from '../../shared/apiSlice'

export const signUpApi = baseApi.injectEndpoints({
	endpoints: build => ({
		signUp: build.mutation({
			query: data => ({
				url: '/users',
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json', 
				},
			}),
		}),

	}),
	overrideExisting: true,
})
