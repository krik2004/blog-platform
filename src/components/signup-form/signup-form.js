import React from 'react'
import styles from './signup-form.module.css'
import { useForm } from 'react-hook-form'
import { signUpApi } from './api-signup'
import { Link, useNavigate } from 'react-router-dom'

const SignupForm = () => {
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		getValues,
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onBlur',
	})

	const [signUp, { isLoading, response, error }] = signUpApi.useSignUpMutation()
	const navigate = useNavigate()
	const onSubmit = async userData => {
		delete userData.repeatpassword
		delete userData.terms
		try {
			const result = await signUp({ user: userData }).unwrap()
			window.localStorage.setItem('user.token', result.user.token)
			navigate('/')
		} catch (error) {
			console.error('Ошибка при регистрации:', error)
			// alert('Произошла ошибка при регистрации, пожалуйста, попробуйте еще раз.')
		}
	}

	// if (error) {
	// 	return (
	// 		<div className='error'>
	// 			{error.data.errors.username}
	// 			{error.data.errors.email}
	// 		</div>
	// 	)
	// }
	return (
		<article className={styles['signup-form']}>
			<div className={styles['content-wrapper']}>
				<span className={styles['title']}>Create new account</span>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles['input-wrapper']}>
						<label className={styles['label']}>
							Username
							<input
								className={styles['input']}
								placeholder='Username'
								{...register('username', {
									required: 'Поле обязательно к заполнению',
									minLength: {
										value: 3,
										message: 'Имя пользователя должно быть минимум 3 символа',
									},
									maxLength: {
										value: 20,
										message: 'Имя пользователя не может быть более 20 символов',
									},
									pattern: {
										value: /^[a-zA-Z0-9_]+$/,
										message:
											'Имя пользователя может содержать только буквы латинского алфавита, цифры и символ подчеркивания',
									},
								})}
							/>
						</label>
						<div className={styles['error']}>
							{errors?.username && (
								<span>{errors?.username?.message || 'Error!'}</span>
							)}
							{error?.data?.errors?.username && (
								<span>{'Имя пользователя уже занято'}</span>
							)}

						</div>
					</div>
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
							{error?.data?.errors?.email && <span>{'Email уже занят'}</span>}
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
					<div className={styles['input-wrapper']}>
						<label className={styles['label']}>
							Repeat Password
							<input
								type='password'
								className={styles['input']}
								placeholder='Repeat Password'
								{...register('repeatpassword', {
									required: 'Поле обязательно к заполнению',
									validate: value =>
										value === getValues('password') ||
										'Пароли должны совпадать',
								})}
							/>
						</label>
						<div className={styles['error']}>
							{errors?.repeatpassword && (
								<span>{errors?.repeatpassword?.message || 'Error!'}</span>
							)}
						</div>
					</div>

					<div className={styles['terms-wrapper']}>
						<input
							className={styles['terms']}
							type='checkbox'
							id='terms'
							{...register('terms', {
								required: 'Поле обязательно к заполнению',
							})}
						/>
						<label className={styles['terms-label']} htmlFor='terms'>
							I agree to the processing of my personal information
						</label>
					</div>

					<div className={styles['button-wrapper']}>
						<button
							className={styles['button']}
							type='submit'
							disabled={!isValid}
						>
							Create
						</button>
					</div>
					<span className={styles['sign-in']}>
						Already have an account? <Link to={`/sign-in`}>Sign In.</Link>
						{isLoading && <p>Загрузка...</p>}
						{response && <p>Регистрация прошла успешно!</p>}
					</span>
				</form>
			</div>
		</article>
	)
}
export default SignupForm
