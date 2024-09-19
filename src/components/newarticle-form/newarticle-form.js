import React from 'react'
import styles from './newarticle-form.module.css'
import { useForm, useFieldArray } from 'react-hook-form'
import { newArticleApi } from './api-newarticle'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { useEffect } from 'react'

const NewArticleForm = () => {
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		control,
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onhange',
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'tagList',
	})

	const [newArticle, { isLoading, response }] =
		newArticleApi.useNewArticleMutation()

	const navigate = useNavigate()

	const onSubmit = async articleData => {
		console.log(articleData)
		try {
			await newArticle(articleData).unwrap()
			navigate('/')
		} catch (error) {
			alert('Произошла ошибка при регистрации, пожалуйста, попробуйте еще раз.')
		}
	}

	const userToken = window.localStorage.getItem('user.token')

	useEffect(() => {
		if (!userToken) {
			navigate('/sign-up')
		}
	}, [userToken, navigate])

	return (
		<article className={styles['newarticle-form']}>
			<div className={styles['content-wrapper']}>
				<span className={styles['title']}>Create new account</span>
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* Title */}
					<div className={styles['input-wrapper']}>
						<label className={styles['label']}>
							Title
							<input
								className={styles['input']}
								placeholder='Title'
								{...register('title', {
									required: 'Поле обязательно к заполнению',
									minLength: {
										value: 3,
										message: 'Заголовок должен быть минимум 3 символа',
									},
									maxLength: {
										value: 20,
										message: 'Заголовок не может быть более 20 символов',
									},
									pattern: {
										value: /^[a-zA-Z0-9_ ]+$/,
										message:
											'Заголовок должен может содержать только буквы латинского алфавита, цифры и символ подчеркивания',
									},
								})}
							/>
						</label>
						<div className={styles['error']}>
							{errors?.title && (
								<span>{errors?.title?.message || 'Error!'}</span>
							)}
						</div>
					</div>

					{/* Short description */}
					<div className={styles['input-wrapper']}>
						<label className={styles['label']}>
							Short description
							<input
								className={styles['input']}
								placeholder='Short description'
								{...register('description', {
									required: 'Поле обязательно к заполнению',
									minLength: {
										value: 3,
										message: 'Короткое описание должно быть минимум 3 символа',
									},
									maxLength: {
										value: 20,
										message:
											'Короткое описание не может быть более 20 символов',
									},
									pattern: {
										value: /^[a-zA-Z0-9_ ]+$/,
										message:
											'Короткое описание может содержать только буквы латинского алфавита, цифры и символ подчеркивания',
									},
								})}
							/>
						</label>
						<div className={styles['error']}>
							{errors?.description && (
								<span>{errors?.description?.message || 'Error!'}</span>
							)}
						</div>
					</div>

					{/* Text */}
					<div className={styles['input-wrapper']}>
						<label className={styles['label']}>
							Text
							<textarea
								autoFocus
								type='text'
								className={styles['article']}
								placeholder='Text'
								{...register('body', {
									required: 'Поле обязательно к заполнению',
									minLength: {
										value: 3,
										message: 'Поле должно быть минимум 3 символа',
									},
									maxLength: {
										value: 500,
										message: 'Поле не может быть более 500 символов',
									},
									pattern: {
										value: /^[a-zA-Z0-9_ ]+$/,
										message:
											'Поле может содержать только буквы латинского алфавита, цифры и символ подчеркивания',
									},
								})}
							/>
						</label>
						<div className={styles['error']}>
							{errors?.body && <span>{errors?.body?.message || 'Error!'}</span>}
						</div>
					</div>

					{/* Tags */}
					<div className={styles['tag-wrapper']}>
						<div className={styles['input-wrapper']}>
							{fields.length > 0 && (
								<label className={styles['label']}>Tags</label>
							)}
							{fields.map((item, index) => (
								<div key={item.id} className={styles['tag-item']}>
									<div className={styles['input-error']}>
										<input
											className={styles['tag']}
											placeholder='Tag'
											{...register(`tagList[${index}]`, {
												required: 'Поле обязательно к заполнению',
												minLength: {
													value: 3,
													message: 'Тэг должен быть минимум 3 символа',
												},
												maxLength: {
													value: 20,
													message: 'Тэг не может быть более 20 символов',
												},
												pattern: {
													value: /^[a-zA-Z0-9_]+$/,
													message:
														'Тэг может содержать только буквы латинского алфавита, цифры и символ подчеркивания',
												},
											})}
											defaultValue={item.value}
										/>

										<div className={styles['error']}>
											{errors?.tagList && errors.tagList[index] && (
												<span>{errors.tagList[index].message}</span>
											)}
										</div>
									</div>

									<Button
										className={styles['button-delTag']}
										type='text'
										onClick={() => remove(index)}
									>
										Delete
									</Button>
								</div>
							))}
						</div>

						<Button
							className={styles['button-addTag']}
							type='text'
							onClick={() => {
								append('')
							}}
							disabled={fields.length >= 4}
						>
							Add tag
						</Button>
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
				</form>
			</div>
		</article>
	)
}
export default NewArticleForm
