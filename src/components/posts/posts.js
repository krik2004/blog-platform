import React, { Fragment } from 'react'
import Post from '../post/post'
import { postsApi } from './api-posts'
import { Pagination } from 'antd'
import { useState } from 'react'
import styles from './posts.module.css'

const Posts = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [currentOffset, setCurrentOffset] = useState(0)

	const { data, isLoading } = postsApi.useGetPostsQuery({
		limit: 5,
		offset: currentOffset,
	})

	if (isLoading || !data) {
		return <div>Loading...</div>
	}
	if (!data || !data.articles) {
		return <div>Error: No articles found.</div>
	}
	return (
		<Fragment>
			<ul>
				{data.articles.map(post => (
					<Post key={post.slug} post={post} />
				))}
			</ul>
			<div className={styles['pagination-wrapper']}>
				<Pagination
					align='end'
					defaultCurrent={1}
					total={data.articlesCount}
					defaultPageSize={5}
					showSizeChanger={false}
					onChange={page => {
						setCurrentPage(page)
						setCurrentOffset((page - 1) * 5)
					}}
				/>
			</div>
		</Fragment>
	)
}
export default Posts
