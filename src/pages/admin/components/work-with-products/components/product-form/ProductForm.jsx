import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import {
	Button,
	H2,
	FormError,
	Input,
	Loader,
	Select,
} from '../../../../../../components'

import { useServerRequest } from '../../../../../../hooks'

import styled from 'styled-components'
import { useMatch } from 'react-router-dom'

const workWithProductsFormSchema = yup.object().shape({
	name: yup.string().required('Ведите название товара'),

	description: yup
		.string()
		.required('Ведите описание')
		.min(10, 'Описание должно содержать не менее 10 символов'),

	price: yup.number().required('Ведите цену').positive('Цена должна быть положительной'),

	imageUrl: yup
		.string()
		.required('Ведите ссылку на изображение')
		.matches(/(https?:\/\/.*\.(?:png|jpg))/, 'Некорректная ссылка на изображение'),
})

const ProductFormContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [serverError, setServerError] = useState(null)
	const [catalogList, setCatalogList] = useState([])
	const serverRequest = useServerRequest()
	const isAddProduct = !!useMatch('/admin/products/add')
	// const isEditProduct = !!useMatch('/admin/products/edit/:productId')

	useEffect(() => {
		// setIsLoading(true)
		serverRequest('fetchCatalog')
			.then(({ error, res: { catalog } }) => {
				if (error) {
					setServerError(error)
				}

				setCatalogList(catalog)
			})
			.finally(() => setIsLoading(false))
	}, [serverRequest])

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			description: '',
			price: 1,
			imageUrl: '',
			catalogId: 1,
		},
		resolver: yupResolver(workWithProductsFormSchema),
	})

	const onSubmit = (data) => {
		console.log(data)
	}

	const formError =
		errors?.name?.message ||
		errors?.price?.message ||
		errors?.description?.message ||
		errors?.imageUrl?.message

	const errorMessage = formError || serverError

	if (isLoading) {
		return <Loader />
	}

	return (
		<div className={className}>
			<H2>{isAddProduct ? 'Добавить товар' : 'Редактировать товар'}</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='name'>Название товара</label>
				<Input
					type='text'
					name='name'
					placeholder='Название товара...'
					{...register('name', { onChange: () => setServerError(null) })}
				/>

				<label htmlFor='description'>Описание товара</label>
				<Input
					type='text'
					name='description'
					placeholder='Описание товара...'
					{...register('description', { onChange: () => setServerError(null) })}
				/>

				<label htmlFor='price'>Цена товара</label>
				<Input
					type='number'
					name='price'
					placeholder='Цена товара...'
					min='1'
					{...register('price', { onChange: () => setServerError(null) })}
				/>

				<label htmlFor='imageUrl'>Ссылка на изображение</label>
				<Input
					type='text'
					name='imageUrl'
					placeholder='Ссылка на изображение...'
					{...register('imageUrl', { onChange: () => setServerError(null) })}
				/>

				<label htmlFor='catalogId'>Выберите каталог</label>
				<Select
					name='catalogId'
					list={catalogList}
					{...register('catalogId')}
					setValue={setValue}
				/>

				<Button>{isAddProduct ? 'Добавить товар' : 'Сохранить товар'}</Button>
				{errorMessage && <FormError>{errorMessage}</FormError>}
			</form>
		</div>
	)
}

export const ProductForm = styled(ProductFormContainer)`
	position: sticky;
	flex: 1;
	top: 170px;

	& label {
		display: flex;
	}

	@media (max-width: 768px) {
		position: static;
		width: 100%;
		padding-bottom: 20px;
		margin-bottom: 10px;
		border-bottom: 2px solid #5e5e5e;
	}
`

ProductFormContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
