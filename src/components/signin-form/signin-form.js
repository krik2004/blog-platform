import React from 'react'
import styles from './signin-form.module.css'

import { useForm } from 'react-hook-form'
import { signInApi } from './api-signin'
import { useNavigate } from 'react-router-dom'

import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const SignInForm = () => {
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onBlur',
	})

	const [signIn, { isLoading, response }] = signInApi.useSignInMutation()

	const navigate = useNavigate()

	const onSubmit = async userData => {
		try {
			const result = await signIn({ user: userData }).unwrap()
			window.localStorage.setItem('user.token', result.user.token)
			navigate('/')
		} catch (error) {
			console.error('Ошибка при регистрации:', error)
		}
	}

	return (
		<article className={styles['signin-form']}>
			<div className={styles['content-wrapper']}>
				<span className={styles['title']}>Sign In</span>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles['input-wrapper']}>
						<label className={styles['label']}>
							Email address
							<input
								className={styles['input']}
								placeholder='Email address'
								{...register('email', {
									required: 'Поле обязательно к заполнению',
									pattern: {
										value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
										message: 'Неверный формат email',
									},
								})}
							/>
						</label>
						<div className={styles['error']}>
							{errors?.email && (
								<span>{errors?.email?.message || 'Error!'}</span>
							)}
						</div>
					</div>
					<div className={styles['input-wrapper']}>
						<label className={styles['label']}>
							Password
							<input
								type='password'
								className={styles['input']}
								placeholder='Password'
								{...register('password', {
									required: 'Поле обязательно к заполнению',
									minLength: {
										value: 6,
										message: 'Пароль должен быть минимум 6 символов',
									},
									maxLength: {
										value: 40,
										message: 'Пароль не может быть более 40 символов',
									},
								})}
							/>
						</label>
						<div className={styles['error']}>
							{errors?.password && (
								<span>{errors?.password?.message || 'Error!'}</span>
							)}
						</div>
					</div>

					<div className={styles['button-wrapper']}>
						{isLoading ? (
							<Spin
								indicator={<LoadingOutlined spin />}
								style={{ marginTop: 30, marginBottom: 11 }}
							/>
						) : (
							<button
								className={styles['button']}
								type='submit'
								disabled={!isValid}
							>
								Login
							</button>
						)}
					</div>
					<span className={styles['sign-in']}>
						Don’t have an account? <Link to='/sign-up'>Sign Up.</Link>
					</span>
				</form>
			</div>
		</article>
	)
}
export default SignInForm
