import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseUrl = 'https://blog.kata.academy/api/'

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl }),
	tagTypes: ['article', 'articles', 'user'],
	endpoints: () => ({}),
})
