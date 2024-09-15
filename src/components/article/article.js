import React from 'react'
import styles from './article.module.css'
import { HeartOutlined, HeartTwoTone, HeartFilled } from '@ant-design/icons'
import { articleApi } from './api-posts'
import { useState } from 'react'
import { Button, Tag, Popconfirm } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'

const Article = () => {
	const { slug } = useParams()
	const userToken = window.localStorage.getItem('user.token')

	const [liked, setLiked] = useState(false)

	const handleLike = () => {
		setLiked(!liked)
	}
	const { data, isLoading } = articleApi.useGetArticleQuery(slug)

	if (isLoading || !data) {
		return <div>Loading...</div>
	}
	if (!data || !data) {
		return <div>Error: No articles found.</div>
	}
	const { article } = data
	const { format } = require('date-fns')

	const handleClickNewArticle = () => {
		console.log('loool')
	}

	const confirm = e => {
		console.log('looll')
		// message.success('Click on Yes')
	}
	// const cancel = e => {
	// 	console.log(e)
	// 	// message.error('Click on No')
	// }
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

				{userToken ? (
					<>
						{/* {error && <span>Что-то пошло не так</span>} */}
						<div className={styles['article__buttons']}>
							<Popconfirm
								// title='Delete the article'
								// description='Are you sure to delete this article?'
								// okText='Yes'
								// cancelText='No'
								title='Delete the article'
								description='Are you sure to delete this article?'
								onConfirm={confirm}
								// onCancel={cancel}
								okText='Yes'
								cancelText='No'
								placement={'right'}
							>
								<Button
									className={styles['header__button-delete-article']}
									type='text'
									danger
									// onClick={handleClickNewArticle}
								>
									Delete
								</Button>
							</Popconfirm>
							<Button
								className={styles['header__button-create-article']}
								type='text'
								// onClick={handleClickNewArticle}
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
			</div>
		</article>
	)
}
export default Article
