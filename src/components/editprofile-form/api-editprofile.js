import { baseApi } from '../../shared/apiSlice'

export const editprofileApi = baseApi.injectEndpoints({
	endpoints: build => ({
		editprofile: build.mutation({
			query: userData => ({
				url: '/user',
				method: 'PUT',
				body: JSON.stringify({
					user: userData.data,
				}),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('user.token')}`,
				},
			}),
			invalidatesTags: ['user', 'article', 'articles'],
		}),
	}),
	overrideExisting: true,
})
