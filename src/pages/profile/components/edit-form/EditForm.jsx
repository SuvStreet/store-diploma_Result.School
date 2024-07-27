import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input, Button, Loader, Error, FormError } from '../../../../components'
import {
	selectAppError,
	selectAppIsLoading,
	selectUser,
} from '../../../../redux/selectors'
import { ACTION_TYPE, editUser } from '../../../../redux/actions'

import styled from 'styled-components'

const editProfileUserFormSchema = yup.object().shape({
	imgUserUrl: yup
		.string()
		.required('Изображение не может быть пустым')
		.matches(
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
			'Некорректный URL',
		),
	login: yup
		.string()
		.required('Логин не может быть пустым')
		.matches(
			/^[A-Za-zА-Яа-я0-9]+$/,
			'Неверно заполнен логин. Допускаются только буквы и цифры',
		)
		.min('4', 'Неверный логин. Минимальная длина логина - 4 символа')
		.max('30', 'Неверный логин. Максимальная длина логина - 30 символов'),
})

const EditFormContainer = ({ className }) => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const isLoading = useSelector(selectAppIsLoading)
	const error = useSelector(selectAppError)
	const navigate = useNavigate()
	const [isSubmitted, setIsSubmitted] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			imgUserUrl: user.imgUserUrl,
			login: user.login,
		},
		resolver: yupResolver(editProfileUserFormSchema),
	})

	const onSubmit = ({ imgUserUrl, login }) => {
		if (imgUserUrl === user.imgUserUrl && login === user.login) {
			navigate(`/profile/${user.id}`)
			return
		}

		setIsSubmitted(true)

		dispatch(
			editUser(user.id, {
				imgUserUrl,
				login,
			}),
		)
	}

	useEffect(() => {
		if (error) {
			setIsSubmitted(false)
		}

		if (isSubmitted && !isLoading && !error) {
			navigate(`/profile/${user.id}`)
		}
	}, [isSubmitted, isLoading, error, navigate, user.id])

	const handleChange = () => {
		if (error) {
			dispatch({ type: ACTION_TYPE.RESET_ERROR })
		}
	}

	const formError = errors?.imgUserUrl?.message || errors?.login?.message

	const errorMessage = formError || error

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
			<div className='form__container'>
				<div className='form__item'>
					<label htmlFor='image'>URL картинки: </label>
					<Input
						id='image'
						type='text'
						name='imgUserUrl'
						placeholder='URL картинки'
						{...register('imgUserUrl', {
							onChange: () => handleChange(),
						})}
					/>
				</div>
				<div className='form__item'>
					<label htmlFor='login'>Логин аккаунта: </label>
					<Input
						id='login'
						type='text'
						name='login'
						placeholder='Логин аккаунта'
						{...register('login', {
							onChange: () => handleChange(),
						})}
					/>
				</div>
			</div>

			{errorMessage && <FormError>{errorMessage}</FormError>}

			<Button solid='darkBlue' disabled={isLoading || !!errorMessage}>
				{isLoading ? <Loader /> : 'Сохранить'}
			</Button>
		</form>
	)
}

export const EditForm = styled(EditFormContainer)`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;

	.form__container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
		justify-content: space-between;

		.form__item {
			display: flex;
			width: 100%;
			gap: 20px;
			align-items: center;
		}

		& label {
			font-weight: 700;
			font-size: 20px;
			width: 30%;
		}
	}

	input {
		margin: 0;
	}
`

EditFormContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
