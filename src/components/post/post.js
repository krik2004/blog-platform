import React, { useState } from 'react'

import styles from './post.module.css'
import { HeartOutlined, HeartTwoTone, HeartFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { Tag } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'

const Post = post => {
	const [liked, setLiked] = useState(false)
	// console.log('пост', post.post)
	// console.log('содержание ', post.post.description)
	// console.log('длина ', post.post.description.length)
	// console.log(typeof post.post.title.author)
	const handleLike = () => {
		setLiked(!liked)
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

					<Button onClick={handleLike} type='link'>
						{liked ? (
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
					alt='аватар'
				/>
			</div>
		</article>
	)
}

export default Post
