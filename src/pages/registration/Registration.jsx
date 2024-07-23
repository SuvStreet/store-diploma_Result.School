import PropTypes from 'prop-types'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { Button, H2, InfoAccount, Input, FormError, Loader } from '../../components'
import { useServerRequest } from '../../hooks'
import { setUser } from '../../redux/actions'
import { setSessionHash } from '../../utils'

import styled from 'styled-components'

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Логин не может быть пустым')
		.matches(/^[A-Za-zА-Яа-я0-9]+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min('4', 'Неверный логин. Минимальная длина логина - 4 символа')
		.max('15', 'Неверный логин. Максимальная длина логина - 15 символов'),

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
	const requestServer = useServerRequest()
	const [serverError, setServerError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	})

	const onSubmit = ({ login, password }) => {
		setIsLoading(true)
		requestServer('register', login, password)
			.then(({ error, res }) => {
				if (error) {
					setServerError(error)
					return
				}

				const { id, login, registeredAt, roleId, sessionHash } = res

				dispatch(setUser({ id, login, registeredAt, roleId }))
				setSessionHash(sessionHash)
				navigate('/')
			})
			.finally(() => setIsLoading(false))
	}

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passCheck?.message

	const errorMessage = formError || serverError

	return (
		<div className={className}>
			<div className='container-registration'>
				<div className='form-registration'>
					<H2>Создайте аккаунт за 20 секунд</H2>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							type='text'
							{...register('login', { onChange: () => setServerError(null) })}
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
