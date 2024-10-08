import React, { useEffect } from 'react'
import styles from './header.module.css'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getUserInfoApi } from './api-userInfo'
import { Link } from 'react-router-dom'

const Header = () => {
	const navigate = useNavigate()
	const handleClick = () => {
		navigate('/sign-up')
	}
	const handleClickSignOut = () => {
		window.localStorage.removeItem('user.token')
		navigate('/')
		window.location.reload()
	}
	const handleClickSignIn = () => {
		navigate('/sign-in')
	}
	const handleClickNewArticle = () => {
		navigate('/new-article')
	}

	const userToken = window.localStorage.getItem('user.token')

	const { data, isLoading, error } = getUserInfoApi.useGetUserInfoQuery(
		userToken || '',
		{
			skip: !userToken,
		}
	)

	const defaultImage =
		'https://i.pinimg.com/736x/b7/5b/29/b75b29441bbd967deda4365441497221.jpg'
	return (
		<header className={styles.header}>
			<h6 className={styles['header__title']}>
				<Link to={`/`}>Realworld Blog</Link>
			</h6>
			{userToken ? (
				<>
					<Button
						className={styles['header__button-create-article']}
						type='text'
						onClick={handleClickNewArticle}
					>
						Create article
					</Button>
					{isLoading ? (
						<div>loading...</div>
					) : (
						<>
							<span className={styles['user-name']}>
								<Link to={`/profile`}>{data.user.username}</Link>
							</span>
							<Link to={`/profile`}>
								<img
									className={styles['person-avatar']}
									src={data.user.image || defaultImage}
									alt='аватар'
								/>
							</Link>
						</>
					)}

					<Button
						className={styles['button-logOut']}
						type='text'
						onClick={handleClickSignOut}
					>
						Log Out
					</Button>
				</>
			) : (
				<>
					<Button
						className={styles['header__button-signIn']}
						type='text'
						onClick={handleClickSignIn}
					>
						Sign In
					</Button>
					<Button
						className={styles['header__button-signUp']}
						onClick={handleClick}
					>
						Sign Up
					</Button>
				</>
			)}
		</header>
	)
}
export default Header
