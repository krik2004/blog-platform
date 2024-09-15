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
	const userToken1 = window.localStorage.getItem('user.token')

	const {
		data: dataUser,
		isLoadingUser,
		errorUser,
	} = getUserInfoApi.useGetUserInfoQuery(userToken1 || '', {
		skip: !userToken1,
	})

	const [liked, setLiked] = useState(false)

	const handleLike = () => {
		setLiked(!liked)
	}
	const navigate = useNavigate()

	const { data, isLoading } = articleApi.useGetArticleQuery(slug)
	// const article = data?.article

	// if (isLoading || isLoadingUser) {
	// 	return <div>Loading...</div> // Показываем индикатор загрузки, пока загружаются данные
	// }

	// if (errorUser) {
	// 	return <div>Error loading user info</div> // Обработка ошибок
	// }

	// if (!article) {
	// 	return <div>Article not found</div> // Обработка отсутствия статьи
	// }




	const [deleteArticle, { isDeleteArticleLoading, response }] =
		articleApi.useDeleteArticleMutation()

	if (isLoadingUser) {
		return <div>Loading...</div>
	}

	if (errorUser) {
		console.error('Error fetching user info:', errorUser)
		return <div>Error fetching user info</div>
	}

	if (dataUser) {
		console.log('getUserInfoApi article: ', dataUser)
	}

	if (isLoading || !data) {
		return <div>Loading...</div>
	}
	if (!data) {
		return <div>Error: No articles found.</div>
	}

	const { article } = data

	if (!isLoading || data) {
		console.log('автор статьи: ', article.author.username)
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

	const isAuthor = article.author.username === dataUser.user.username
	// console.log('сравнение ', article.author.username, dataUser.user.username)

	const handleEditArticle = () => {
		navigate(`/articles/${slug}/edit`)
	}
	return (
		<article className={styles.article}>
			<div className={styles['article__content-wrapper']}>
				<div className={styles['article__title-wrapper']}>
					<h5 className={styles.article__title}>{article.title}</h5>
					<Button onClick={handleLike} type='link'>
						{liked ? (
							<HeartFilled style={{ color: 'red' }} />
						) : (
							<HeartOutlined />
						)}
						{article.favoritesCount}
					</Button>
				</div>
				<ul className={styles.article__tagList}>
					{article.tagList && article.tagList.length > 0 ? (
						article.tagList.map(tag => (
							<Tag key={uuidv4()} className={styles.customTag}>
								{tag}
							</Tag>
						))
					) : (
						<div className={styles['article__content-text']}>No tags</div>
					)}
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

				{userToken1 ? (
					<>
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

						{isLoading ? (
							<div>loading...</div>
						) : (
							<>
								<span className={styles['user-name']}>
									{/* {data && data.user ? ( */}
									{/* <Link to={`/profile`}>{data.user.username}</Link> */}
									{/* ) : ( */}
									{/* 'Имя пользователя недоступно' */}
									{/* )} */}
								</span>
							</>
						)}
					</>
				) : (
					<>
						<Button
							className={styles['header__button-signIn']}
							type='text'
							// onClick={handleClickSignIn}
						>
							Sign In
						</Button>
						<Button
							className={styles['header__button-signUp']}
							// onClick={handleClick}
						>
							Sign Up
						</Button>
					</>
				)}
				<>
					{userToken1 ? (
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

							<span className={styles['user-name']}>
								{dataUser.user.username}
							</span>
						</>
					) : (
						<>
							<Button
								className={styles['header__button-signIn']}
								type='text'
								// onClick={handleClickSignIn}
							>
								Sign In
							</Button>
							<Button
								className={styles['header__button-signUp']}
								// onClick={handleClick}
							>
								Sign Up
							</Button>
						</>
					)}
				</>
			</div>
		</article>
	)
}
export default Article
