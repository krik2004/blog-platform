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
	}
	const handleClickSignIn = () => {
		navigate('/sign-in')
	}
	const handleClickNewArticle = () => {
		navigate('/new-article')
	}

	const userToken = window.localStorage.getItem('user.token')
	// console.log('в хедере ', userToken)

	const { data, isLoading, error } = getUserInfoApi.useGetUserInfoQuery(
		userToken || '',
		{
			skip: !userToken, // Пропустить запрос, если нет токена
		}
	)

	// useEffect(() => {
	// 	if (!isLoading && data) {
	// 		console.log('в хедере данные о юзере:', data)
	// 	}
	// }, [isLoading, data])

	// console.log(data)
	const defaultImage =
		'https://i.pinimg.com/736x/b7/5b/29/b75b29441bbd967deda4365441497221.jpg'
	return (
		<header className={styles.header}>
			<h6 className={styles['header__title']}>
				<Link to={`/`}>Realworld Blog</Link>
			</h6>
			{userToken ? (
				<>
					{/* {error && <span>Что-то пошло не так</span>} */}
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
								{/* {data && data.user ? ( */}
								<Link to={`/profile`}>{data.user.username}</Link>
								{/* ) : ( */}
								{/* 'Имя пользователя недоступно' */}
								{/* )} */}
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
