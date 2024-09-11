import { baseApi } from '../../shared/apiSlice'

export const signUpApi = baseApi.injectEndpoints({
	endpoints: build => ({
		signUp: build.mutation({
			query: data => ({
				url: '/users',
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json', // Убедитесь, что заголовок установлен
				},
			}),
		}),
		// transformResponse: response => {

		// 	localStorage.setItem('user.token', response.user.token)

		// },
	}),
	overrideExisting: true,
})
