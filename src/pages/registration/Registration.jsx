import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { Button, H2, InfoAccount, Input, FormError, Loader } from '../../components'
import { registration } from '../../redux/actions'
import {
	selectIsAuth,
	selectRegistrationError,
	selectRegistrationIsLoading,
} from '../../redux/selectors'

import styled from 'styled-components'

const authFormSchema = yup.object().shape({
	email: yup
		.string()
		.required('Электронная почта не может быть пустой')
		.matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Некорректная электронная почта'),
	password: yup
		.string()
		.required('Пароль не может быть пустым')
		.matches(
			/^[A-Za-zА-Яа-я0-9#%]+$/,
			'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %',
		)
		.min('4', 'Неверный пороль. Минимальная длина пороля - 4 символа')
		.max('30', 'Неверный пороль. Максимальная длина пороля - 30 символов'),
	passCheck: yup
		.string()
		.required('Поле "повтора пороля" не может быть пустым')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
})

const RegistrationContainer = ({ className }) => {
	const navigate = useNavigate()
	const [serverError, setServerError] = useState(null)
	const dispatch = useDispatch()
	const error = useSelector(selectRegistrationError)
	const isAuth = useSelector(selectIsAuth)
	const isLoading = useSelector(selectRegistrationIsLoading)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	})

	useEffect(() => {
		if (error) {
			setServerError(error)
		}

		if (isAuth) {
			navigate('/')
		}
	}, [error, isAuth, navigate])

	const onSubmit = ({ email, password }) => {
		dispatch(
			registration({ email, password, created_at: new Date(), updated_at: new Date() }),
		)
	}

	const formError =
		errors?.email?.message || errors?.password?.message || errors?.passCheck?.message

	const errorMessage = formError || serverError

	return (
		<div className={className}>
			<div className='container-registration'>
				<div className='form-registration'>
					<H2>Создайте аккаунт за 20 секунд</H2>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							type='text'
							{...register('email', { onChange: () => setServerError(null) })}
							placeholder='Логин...'
						/>
						<Input
							type='password'
							{...register('password', { onChange: () => setServerError(null) })}
							placeholder='Пароль...'
						/>
						<Input
							type='password'
							{...register('passCheck', { onChange: () => setServerError(null) })}
							placeholder='Повторите пароль...'
						/>
						<Button
							type='submit'
							disabled={!!formError || isLoading}
							height='40px'
							solid='#5e5e5e'
						>
							{isLoading ? <Loader /> : 'Создать аккаунт'}
						</Button>
						{errorMessage && <FormError>{errorMessage}</FormError>}
					</form>
				</div>
				<div className='link-auth'>
					<span className='link-auth__text'>У вас уже есть аккаунт?</span>
					<Link to='/authorize'>Авторизоваться</Link>
				</div>
			</div>
			<div className='container-info'>
				<InfoAccount margin='21px 0' />
			</div>
		</div>
	)
}

export const Registration = styled(RegistrationContainer)`
	display: flex;

	.form-registration {
		border: 1px solid #5e5e5e;
		border-radius: 10px;
		padding: 20px;
		margin: 20px;
	}

	.link-auth {
		display: flex;
		justify-content: center;

		& a {
			color: #5517ff;
		}
	}

	.link-auth__text {
		margin-right: 10px;
	}

	.container-info {
		display: flex;
		flex-direction: column;
		margin: 20px;
	}

	@media (max-width: 768px) {
		display: block;

		.form-registration {
			margin: 0;
		}
	}
`

RegistrationContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
