import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseUrl = 'https://blog.kata.academy/api/'

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl }), // базовый урл
	tagTypes: ['article', 'articles'],
	endpoints: () => ({}),
})
