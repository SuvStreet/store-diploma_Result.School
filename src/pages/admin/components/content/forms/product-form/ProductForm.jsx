/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import {
	ACTION_TYPE,
	addProduct,
	getSubCategoriesList,
	editProduct,
} from '../../../../../../redux/actions'
import {
	selectProductsList,
	selectSubCategoriesList,
} from '../../../../../../redux/selectors'

import {
	Button,
	FormError,
	Input,
	Loader,
	Select,
	Textarea,
} from '../../../../../../components' // Импорт вашего компонента для отображения ошибок

import styled from 'styled-components'

const schema = yup.object().shape({
	name: yup.string().required('Название товара обязательно'),
	description: yup.string().required('Описание обязательно'),
	subcategory_id: yup.string().required('Подкатегория обязательна'),
	images: yup
		.array()
		.of(
			yup
				.string()
				.url('Некорректный URL изображения')
				.required('Изображение обязательно'),
		),
	brand: yup.string().required('Бренд обязателен'),
	features: yup.array().of(
		yup.object().shape({
			key: yup.string().required('Ключ обязателен'),
			value: yup.string().required('Значение обязательно'),
		}),
	),
	variants: yup.array().of(
		yup.object().shape({
			price: yup
				.number()
				.required('Цена обязательна')
				.positive('Цена должна быть положительной'),
			discount: yup.number().min(0, 'Скидка не может быть отрицательной'),
			quantity: yup.number().min(0, 'Количество не может быть отрицательным'),
			additionalFeatures: yup.array().of(
				yup.object().shape({
					key: yup.string().required('Ключ обязателен'),
					value: yup.string().required('Значение обязательно'),
				}),
			),
		}),
	),
})

const ProductFormContainer = ({ className }) => {
	const [submitFlag, setSubmitFlag] = useState(false)
	const [submitSuccess, setSubmitSuccess] = useState(false)
	const dispatch = useDispatch()
	const { subCategories, isLoading: isLoadingSub } = useSelector(selectSubCategoriesList)
	const {
		isLoading: isLoadingServer,
		error: errorServer,
		products,
	} = useSelector(selectProductsList)
	const navigate = useNavigate()
	const { id } = useParams()
	const isEdit = !!useMatch('/admin/products/edit/:id')

	const {
		control,
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			description: '',
			subcategory_id: '',
			images: [''],
			brand: '',
			features: [{ key: '', value: '' }],
			variants: [
				{
					additionalFeatures: [{ key: '', value: '' }],
					discount: 0,
					price: 0,
					quantity: 0,
				},
			],
		},
	})

	const { fields: imageFields, append: appendImage } = useFieldArray({
		control,
		name: 'images',
	})
	const { fields: featureFields, append: appendFeature } = useFieldArray({
		control,
		name: 'features',
	})
	const { fields: variantFields, append: appendVariant } = useFieldArray({
		control,
		name: 'variants',
	})

	useEffect(() => {
		if (!subCategories.length) {
			dispatch(getSubCategoriesList())
		} else {
			setValue('subcategory_id', subCategories[0].id)
		}

		if (submitFlag) {
			if (!isLoadingServer && !errorServer) {
				setSubmitFlag(false)
				setSubmitSuccess(true)
			}
		}

		if (!errorServer && submitSuccess) {
			navigate('/admin/products')
		}

		if (imageFields.length === 0) {
			appendImage('')
		}

		if (isEdit && products.length && !isLoadingServer) {
			setValue('name', products.find((item) => item.id === id).name)
			setValue('description', products.find((item) => item.id === id).description)
			setValue('subcategory_id', products.find((item) => item.id === id).subCategoryId.id)
			setValue('images', products.find((item) => item.id === id).images)
			setValue('brand', products.find((item) => item.id === id).brand)
			setValue('features', products.find((item) => item.id === id).features)
			setValue('variants', products.find((item) => item.id === id).variants)
		}
	}, [
		dispatch,
		subCategories,
		errorServer,
		navigate,
		submitSuccess,
		submitFlag,
		isLoadingServer,
	])

	const onAddVariant = () => {
		const firstVariantFeatures = variantFields[0].additionalFeatures.map((feature) => ({
			key: feature.key,
			value: '',
		}))

		appendVariant({
			additionalFeatures: firstVariantFeatures,
			discount: 0,
			price: 0,
			quantity: 0,
		})
	}

	const onAddFeature = () => {
		const variants = getValues('variants')
		const newFeature = { key: '', value: '' }

		variants.forEach((variant) => {
			variant.additionalFeatures = [...variant.additionalFeatures, newFeature]
		})

		setValue('variants', variants)
	}

	const onSubmit = (data) => {
		isEdit ? dispatch(editProduct(id, data)) : dispatch(addProduct(data))
		setSubmitFlag(true)
	}

	const resetError = () => {
		if (errorServer) {
			dispatch({ type: ACTION_TYPE.RESET_PRODUCT_ERROR })
			setSubmitFlag(false)
		}
	}

	if (!subCategories.length || isLoadingSub) {
		return <Loader fontSize='150px' />
	}

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<div className='form__group'>
				<label>Название товара:</label>
				<div className='form__input'>
					<Input
						type='text'
						{...register('name', { onChange: () => resetError() })}
						placeholder='Название товара'
					/>
					{errors.name && <FormError>{errors.name.message}</FormError>}
				</div>
			</div>
			<div className='form__group'>
				<label>Описание:</label>
				<div className='form__input'>
					<Textarea
						type='text'
						{...register('description', { onChange: () => resetError() })}
						placeholder='Описание'
					/>
					{errors.description && <FormError>{errors.description.message}</FormError>}
				</div>
			</div>

			<div className='form__group'>
				<label>ID Подкатегории:</label>

				<div className='form__input'>
					<Select
						name='subcategory_id'
						list={subCategories}
						value={getValues('subcategory_id')}
						{...register('subcategory_id', {
							onChange: () => {
								resetError()
							},
						})}
					/>
					{errors.subcategory_id && (
						<FormError>{errors.subcategory_id.message}</FormError>
					)}
				</div>
			</div>

			<div className='form__group'>
				<label>Изображения (URLs):</label>
				<div className='form__input'>
					{imageFields.map((img, idx) => (
						<div key={img.id} className='form__group'>
							<div className='form__input'>
								<Input
									type='text'
									{...register(`images.${idx}`, {
										onChange: () => resetError(),
									})}
									placeholder='URL изображения'
								/>
								{errors.images?.[idx] && (
									<FormError>{errors.images[idx].message}</FormError>
								)}
							</div>
						</div>
					))}
					<Button type='button' onClick={() => appendImage('')} solid='green'>
						Добавить изображение
					</Button>
				</div>
			</div>

			<div className='form__group'>
				<label>Бренд:</label>
				<div className='form__input'>
					<Input
						type='text'
						{...register('brand', { onChange: () => resetError() })}
						placeholder='Бренд'
					/>
					{errors.brand && <FormError>{errors.brand.message}</FormError>}
				</div>
			</div>

			<div className='form__group'>
				<label>Общие характеристики:</label>
				<div className='form__features'>
					{featureFields.map((feature, idx) => (
						<div className='form__feature' key={feature.id}>
							<div className='form__input'>
								<Input
									type='text'
									{...register(`features.${idx}.key`, {
										onChange: () => resetError(),
									})}
									placeholder='Ключ'
								/>
								{errors.features?.[idx]?.key && (
									<FormError>{errors.features[idx].key.message}</FormError>
								)}
							</div>
							<div className='form__input'>
								<Input
									type='text'
									{...register(`features.${idx}.value`, {
										onChange: () => resetError(),
									})}
									placeholder='Значение'
								/>
								{errors.features?.[idx]?.value && (
									<FormError>{errors.features[idx].value.message}</FormError>
								)}
							</div>
						</div>
					))}

					<Button
						type='button'
						onClick={() => appendFeature({ key: '', value: '' })}
						solid='green'
					>
						Добавить характеристику
					</Button>
				</div>
			</div>

			<div className='form__group'>
				<label>Дополнительные конфигурации товара:</label>
				<div className='form__variants'>
					{variantFields.map((variant, idx) => (
						<div className='form__variant' key={variant.id}>
							<div className='variant'>
								<label>Цена:</label>
								<div className='form__input'>
									<Input
										type='number'
										{...register(`variants.${idx}.price`, {
											onChange: () => resetError(),
										})}
									/>
									{errors.variants?.[idx]?.price && (
										<FormError>{errors.variants[idx].price.message}</FormError>
									)}
								</div>
							</div>

							<div className='variant'>
								<label>Скидка:</label>
								<div className='form__input'>
									<Input
										type='number'
										{...register(`variants.${idx}.discount`, {
											onChange: () => resetError(),
										})}
									/>
									{errors.variants?.[idx]?.discount && (
										<FormError>{errors.variants[idx].discount.message}</FormError>
									)}
								</div>
							</div>

							<div className='variant'>
								<label>Количество:</label>
								<div className='form__input'>
									<Input
										type='number'
										{...register(`variants.${idx}.quantity`, {
											onChange: () => resetError(),
										})}
									/>
									{errors.variants?.[idx]?.quantity && (
										<FormError>{errors.variants[idx].quantity.message}</FormError>
									)}
								</div>
							</div>

							<div className='variant form__features-variant'>
								<label>Дополнительные характеристики:</label>
								{variant.additionalFeatures.map((feat, featIdx) => (
									<div className='form__feature-variant' key={featIdx}>
										<div className='form__input'>
											<Input
												type='text'
												{...register(
													`variants.${idx}.additionalFeatures.${featIdx}.key`,
													{ onChange: () => resetError() },
												)}
												placeholder='Ключ'
											/>
											{errors.variants?.[idx]?.additionalFeatures?.[featIdx]?.key && (
												<FormError>
													{errors.variants[idx].additionalFeatures[featIdx].key.message}
												</FormError>
											)}
										</div>
										<div className='form__input'>
											<Input
												type='text'
												{...register(
													`variants.${idx}.additionalFeatures.${featIdx}.value`,
													{ onChange: () => resetError() },
												)}
												placeholder='Значение'
											/>
											{errors.variants?.[idx]?.additionalFeatures?.[featIdx]?.value && (
												<FormError>
													{errors.variants[idx].additionalFeatures[featIdx].value.message}
												</FormError>
											)}
										</div>
									</div>
								))}
								<Button type='button' solid='green' onClick={onAddFeature}>
									Добавить характеристику
								</Button>
							</div>
						</div>
					))}
					<Button type='button' onClick={onAddVariant}>
						Добавить вариант
					</Button>
				</div>
			</div>
			{errorServer && <FormError>{errorServer}</FormError>}
			<Button type='submit' disabled={isLoadingServer || errorServer}>
				{isLoadingServer ? <Loader /> : 'Сохранить продукт'}
			</Button>
		</form>
	)
}

ProductFormContainer.propTypes = {
	className: PropTypes.string,
}

export const ProductForm = styled(ProductFormContainer)`
	.form__group {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}

	input {
		margin: 0;
	}

	label {
		font-weight: 700;
		margin-right: 10px;
		width: 150px;
	}

	.form__input {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		& div {
			width: 100%;
		}
	}

	.form__features {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;

		.form__feature {
			display: flex;
			gap: 20px;
		}
	}

	.form__variants {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;

		.form__variant {
			display: flex;
			flex-direction: column;
			border: 1px solid #5e5e5e;
			border-radius: 10px;
			padding: 20px;

			.variant {
				display: flex;
				align-items: center;
				gap: 10px;
				margin-bottom: 10px;
			}

			.form__features-variant {
				display: flex;
				flex-direction: column;

				.form__feature-variant {
					width: 100%;
					display: flex;
					gap: 20px;
				}

				label {
					width: 100%;
				}
			}
		}
	}
`
