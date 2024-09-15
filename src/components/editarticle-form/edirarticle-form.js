import React, { useEffect } from 'react'
import styles from './edirarticle-form.module.css'
import { editArticleApi } from './api-edirarticle'
import { useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { articleApi } from '../article/api-posts'
import { useParams } from 'react-router-dom'
import { Button } from 'antd'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const EditArticleForm = () => {
	const { slug } = useParams()
	const { data, isArticleDataLoading } = articleApi.useGetArticleQuery(slug)

	const [editArticle, { isArticleEditedDataLoading, response }] =
		editArticleApi.useEditArticleMutation()

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		setValue, // добавляем setValue для обновления значений формы
		control,
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onChange',
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'tagList',
	})

	useEffect(() => {
		if (!isArticleDataLoading && data) {
			setValue('tagList', data.article.tagList || [])
		}
	}, [data, isArticleDataLoading, setValue])

	const onSubmit = async articleData => {
		console.log(slug)

		try {
			const result = await editArticle({ data: articleData, slug }).unwrap()

			console.log('результат изменения статьи: ', result)
		} catch (error) {
			console.error('Ошибка при изменении статьи:', error)
			alert(
				'Произошла ошибка при изменении статьи, пожалуйста, попробуйте еще раз.'
			)
		}
	}

	if (isArticleDataLoading) return <Spin indicator={<LoadingOutlined spin />} />
	// console.log(data.article.tagList)
	if (isArticleDataLoading && !data) {
		return (
			<div className={styles['error']}>
				Ошибка загрузки статьи или статья не найдена.
			</div>
		)
	}
	if (!isArticleDataLoading && data) {
		return (
			<article className={styles['newarticle-form']}>
				<div className={styles['content-wrapper']}>
					<span className={styles['title']}>Edit article</span>
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* Title */}
						<div className={styles['input-wrapper']}>
							<label className={styles['label']}>
								Title
								<input
									className={styles['input']}
									placeholder='Title'
									defaultValue={data?.article?.title || ''}
									{...register('title', {
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
									defaultValue={data?.article?.description || ''}
									{...register('description', {
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
									defaultValue={data?.article?.body || ''}
									{...register('body', {
										required: 'Поле обязательно к заполнению',
										minLength: {
											value: 3,
											message: 'Имя пользователя должно быть минимум 3 символа',
										},
										maxLength: {
											value: 500,
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
							</label>
							<div className={styles['error']}>
								{errors?.body && (
									<span>{errors?.body?.message || 'Error!'}</span>
								)}
							</div>
						</div>

						{/* Tags */}
						<div className={styles['tag-wrapper']}>
							<div className={styles['input-wrapper']}>
								{fields.length > 0 && (
									<label className={styles['label']}>Tags</label>
								)}

								{/* {fields.length === 0 && append('')} */}
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
														message: 'Тэг не может быть более 10 символов',
													},
													pattern: {
														value: /^[a-zA-Z0-9_]+$/,
														message:
															'Тэг может содержать только буквы латинского алфавита, цифры и символ подчеркивания',
													},
												})}
												// ref={register}
												defaultValue={item}
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
											// disabled={fields.length <= 1}
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
								Send
							</button>
						</div>
					</form>
				</div>
			</article>
		)
	}
}
export default EditArticleForm
