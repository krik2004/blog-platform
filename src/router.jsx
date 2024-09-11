import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import React from 'react'
import Article from './components/article/article'
import Posts from './components/posts/posts'
import { articleApi } from './components/article/api-posts'
import SignupForm from './components/signup-form/signup-form'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Posts />,
			},
			{
				path: '/articles',
				element: <Posts />,
			},
			{
				path: 'article/:slug',
				// loader: async ({ params }) => {
				// 	console.log(params)
				// 	const { data } = await articleApi.endpoints.getArticle.initiate(
				// 		params.slug
				// 	)
				// 	return data
				// },
				element: <Article />,
			},
			{
				path: `/sign-up`,
				element: <SignupForm />,
			},
		],
	},
])

export default router
