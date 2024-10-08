import React, { useState } from 'react'

import styles from './post.module.css'
import { HeartOutlined, HeartTwoTone, HeartFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { Tag } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'

import { articleApi } from '../article/api-posts'

const Post = post => {
	const [
		favoriteArticle,
		{ isLoadingFavoritedArticleData, favoritedArticleData },
	] = articleApi.useFavoriteArticleMutation(post.post.slug)

	const [
		unfavoriteArticle,
		{ isLoadingUnfavoritedArticleData, unfavoritedArticleData },
	] = articleApi.useUnfavoriteArticleMutation(post.post.slug)

	const userToken = window.localStorage.getItem('user.token')



	const handleLike = async () => {
		if (!post.post.favorited) {
			try {
				await favoriteArticle(post.post.slug)
			} catch (error) {
				console.log(error)
			}
		} else {
			try {
				await unfavoriteArticle(post.post.slug)
			} catch (error) {
				console.log(error)
			}
		}
	}

	const { format } = require('date-fns')
	const shortenText = (text, maxLength) => {
		if (text.length <= maxLength) {
			return text
		}
		const shortenedText =
			text.substr(0, text.lastIndexOf(' ', maxLength)) + ' ...'
		return shortenedText
	}
	return (
		<article className={styles.post}>
			<div className={styles['post__content-wrapper']}>
				<div className={styles['post__title-wrapper']}>
					<h5 className={styles.post__title}>
						<Link to={`article/${post.post.slug}`}>{post.post.title}</Link>
					</h5>

					<Button onClick={handleLike} type='link' disabled={!userToken}>
						{post.post.favorited ? (
							<HeartFilled style={{ color: 'red' }} />
						) : (
							<HeartOutlined />
						)}
						{post.post.favoritesCount}
					</Button>
				</div>
				<ul className={styles.post__tagList}>
					{post.post.tagList && post.post.tagList.length > 0
						? post.post.tagList
								.filter(tag => tag.trim() !== '')
								.map(tag => (
									<Tag key={uuidv4()} className={styles.customTag}>
										{tag}
									</Tag>
								))
						: null}
				</ul>
				<div className={styles['post__content-text']}>
					{post.post.description
						? shortenText(post.post.description, 250)
						: 'No description'}
				</div>
			</div>
			<div className={styles['post__person-wrapper']}>
				<div className={styles['post__person-atr-wrapper']}>
					<div className={styles['post__person-name']}>
						{post.post.author.username}
					</div>
					<div className={styles['post__date']}>
						{format(new Date(post.post.createdAt), 'MMMM d, yyyy, HH:MM')}
					</div>
				</div>
				<img
					className={styles['post__person-avatar']}
					src={post.post.author.image}
					alt='avatar'
				/>
			</div>
		</article>
	)
}

export default Post
