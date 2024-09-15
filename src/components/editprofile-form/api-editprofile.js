import { baseApi } from '../../shared/apiSlice'

export const editprofileApi = baseApi.injectEndpoints({
	endpoints: build => ({
		editprofile: build.mutation({
			query: ({ data, userToken }) => ({
				url: '/user',
				method: 'PUT',
				body: JSON.stringify({
					user: {
						username: data.username,
						email: data.email,
						password: data.newpassword,
						image: data.image,
					},
				}),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userToken}`,
				},
			}),
		}),
		// transformResponse: response => {

		// 	localStorage.setItem('user.token', response.user.token)

		// },
	}),
	overrideExisting: true,
})
