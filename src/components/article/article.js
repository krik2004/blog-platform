import React, { useEffect } from 'react'
import styles from './article.module.css'
import { HeartOutlined, HeartTwoTone, HeartFilled } from '@ant-design/icons'
import { articleApi } from './api-posts'
import { useState } from 'react'
import { Button, Tag, Popconfirm } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { getUserInfoApi } from '../footer/api-userInfo'

const Article = () => {
	const { slug } = useParams()
	const navigate = useNavigate()
	const userToken1 = window.localStorage.getItem('user.token')

	const {
		data: dataUser,
		isLoadingUser,
		error: errorUser,
	} = getUserInfoApi.useGetUserInfoQuery(userToken1 || '', {
		skip: !userToken1,
	})

	const [
		favoriteArticle,
		{ isLoadingFavoritedArticleData, favoritedArticleData },
	] = articleApi.useFavoriteArticleMutation(slug)

	const [
		unfavoriteArticle,
		{ isLoadingUnfavoritedArticleData, unfavoritedArticleData },
	] = articleApi.useUnfavoriteArticleMutation(slug)

	if (isLoadingFavoritedArticleData) {
		return <div>isLoadingFavoritedArticleData Loading...</div>
	}

	if (isLoadingUnfavoritedArticleData) {
		return <div>isLoadingUnfavoritedArticleData Loading...</div>
	}

	const { data, isLoading } = articleApi.useGetArticleQuery(slug)

	const [deleteArticle, { isDeleteArticleLoading, response }] =
		articleApi.useDeleteArticleMutation()

	if (isLoadingUser) {
		return <div>Loading isLoadingUser...</div>
	}
	if (errorUser) {
		return <div>{errorUser}isLoadingUser...</div>
	}
	if (errorUser) {
		console.error('Error fetching user info:', errorUser)
		return <div>Error fetching user info</div>
	}
	if (isLoading || !data) {
		return <div>Loading...</div>
	}
	if (!data) {
		return <div>Error: No articles found.</div>
	}

	const { article } = data

	const handleLike = async () => {
		if (!article.favorited) {
			try {
				await favoriteArticle(slug)
			} catch (error) {
				console.log(error)
			}
		} else {
			try {
				await unfavoriteArticle(slug)
			} catch (error) {
				console.log(error)
			}
		}
	}

	const { format } = require('date-fns')

	const confirm = async () => {
		try {
			await deleteArticle(slug).unwrap()
			navigate('/')
		} catch (error) {
			console.log('Error deleting article:', error)
		}
	}

	if (errorUser) {
		return <div>Error loading user data: {errorUser.message}</div>
	}

	// if (!dataUser) {
	// 	return <div>No user data available.</div>
	// }
	let isAuthor = true
	if (userToken1) {
		isAuthor = article.author.username === dataUser.user.username
	} else {
		isAuthor = false
	}

	const handleEditArticle = () => {
		navigate(`/articles/${slug}/edit`)
	}
	return (
		<article className={styles.article}>
			<div className={styles['article__content-wrapper']}>
				<div className={styles['article__title-wrapper']}>
					<h5 className={styles.article__title}>{article.title}</h5>
					<Button onClick={handleLike} type='link' disabled={!userToken1}>
						{article.favorited ? (
							<HeartFilled style={{ color: 'red' }} />
						) : (
							<HeartOutlined />
						)}
						{article.favoritesCount}
					</Button>
				</div>
				<ul className={styles.article__tagList}>
					{article.tagList && article.tagList.length > 0
						? article.tagList.map(tag => (
								<Tag key={uuidv4()} className={styles.customTag}>
									{tag}
								</Tag>
							))
						: null}
				</ul>
				<div className={styles['article__content-text']}>
					{article.description ? article.description : 'No description'}
				</div>
				<div className={styles['article__content-text']}>
					<ReactMarkdown>
						{article.body ? article.body : 'No description'}
					</ReactMarkdown>
				</div>
			</div>

			<div className={styles['article__person-meta']}>
				<div className={styles['article__person-wrapper']}>
					<div className={styles['article__person-atr-wrapper']}>
						<div className={styles['article__person-name']}>
							{article.author.username}
						</div>
						<div className={styles['article__date']}>
							{format(new Date(article.createdAt), 'MMMM d, yyyy, HH:MM')}
						</div>
					</div>
					<img
						className={styles['article__person-avatar']}
						src={article.author.image}
						alt='аватар'
					/>
				</div>
				<>
					{userToken1 && (
						<>
							{isAuthor && (
								<div className={styles['article__buttons']}>
									<Popconfirm
										title='Delete the article'
										description='Are you sure to delete this article?'
										onConfirm={confirm}
										okText='Yes'
										cancelText='No'
										placement={'right'}
									>
										<Button
											className={styles['header__button-delete-article']}
											type='text'
											danger
										>
											Delete
										</Button>
									</Popconfirm>
									<Button
										className={styles['header__button-create-article']}
										type='text'
										onClick={handleEditArticle}
									>
										Edit
									</Button>
								</div>
							)}
						</>
					)}
				</>
			</div>
		</article>
	)
}
export default Article
