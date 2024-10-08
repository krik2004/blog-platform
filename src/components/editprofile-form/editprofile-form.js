import React from 'react'
import styles from './editprofile-form.module.css'
import { useForm } from 'react-hook-form'
import { signUpApi } from './api-editprofile'
import { useNavigate } from 'react-router-dom'
import { getUserInfoApi } from '../footer/api-userInfo'
import { editprofileApi } from './api-editprofile'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const EditprofileForm = () => {
	const userToken = window.localStorage.getItem('user.token')

	const { data, isUserInfoLoading, error } = getUserInfoApi.useGetUserInfoQuery(
		userToken || '',
		{
			skip: !userToken,
		}
	)

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onBlur',
	})

	const [editprofile, { isLoading, response }] =
		editprofileApi.useEditprofileMutation()

	const navigate = useNavigate()

	const onSubmit = async userData => {
		try {
			await editprofile({ data: userData }).unwrap()
			navigate('/')
		} catch (error) {
			console.error('Ошибка при регистрации:', error)
			alert('Произошла ошибка при регистрации, пожалуйста, попробуйте еще раз.')
		}
	}
	if (isUserInfoLoading) return <Spin indicator={<LoadingOutlined spin />} />

	return (
		<article className={styles['signup-form']}>
			<div className={styles['content-wrapper']}>
				<span className={styles['title']}>Edit Profile</span>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles['input-wrapper']}>
						<label className={styles['label']}>
							Username
							{isUserInfoLoading ? (
								<Spin indicator={<LoadingOutlined spin />} />
							) : (
								<input
									className={styles['input']}
									placeholder='Username'
									defaultValue={data?.user?.username || ''}
									{...register('username', {
										required: 'Поле обязательно к заполнению',
										minLength: {
											value: 3,
											message: 'Имя пользователя должно быть минимум 3 символа',
										},
										maxLength: {
											value: 20,
											message:
												'Имя пользователя не может быть более 20 символов',
										},
										pattern: {
											value: /^[a-zA-Z0-9_]+$/,
											message:
												'Имя пользователя может содержать только буквы латинского алфавита, цифры и символ подчеркивания',
										},
									})}
								/>
							)}
						</label>
						<div className={styles['error']}>
							{errors?.username && (
								<span>{errors?.username?.message || 'Error!'}</span>
							)}
						</div>
					</div>

					<div className={styles['input-wrapper']}>
						<label className={styles['label']}>
							Email address
							{isUserInfoLoading ? (
								<Spin indicator={<LoadingOutlined spin />} />
							) : (
								<input
									className={styles['input']}
									placeholder='Email address'
									defaultValue={data?.user?.email || ''}
									{...register('email', {
										required: 'Поле обязательно к заполнению',
										pattern: {
											value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
											message: 'Неверный формат email',
										},
									})}
								/>
							)}
						</label>
						<div className={styles['error']}>
							{errors?.email && (
								<span>{errors?.email?.message || 'Error!'}</span>
							)}
						</div>
					</div>

					<div className={styles['input-wrapper']}>
						<label className={styles['label']}>
							New Password
							<input
								type='password'
								className={styles['input']}
								placeholder='New Password'
								{...register('newpassword', {
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
							{errors?.newpassword && (
								<span>{errors?.newpassword?.message || 'Error!'}</span>
							)}
						</div>
					</div>

					<div className={styles['input-wrapper']}>
						<label className={styles['label']}>
							Avatar image (url)
							<input
								type='url'
								className={styles['input']}
								placeholder='Avatar image (url)'
								{...register('image', {
									pattern: {
										value: /^(ftp|http|https):\/\/[^ "]+$/,
										message: 'Введите корректный URL',
									},
								})}
							/>
						</label>
						<div className={styles['error']}>
							{errors?.image && (
								<span>{errors?.image?.message || 'Error!'}</span>
							)}
						</div>
					</div>

					<div className={styles['button-wrapper']}>
						<button
							className={styles['button']}
							type='submit'
							disabled={!isValid}
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</article>
	)
}
export default EditprofileForm
