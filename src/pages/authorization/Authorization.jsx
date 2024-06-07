import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PropType from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button, H2, Input } from '../../components'
import { InfoCard } from './components'

import { faBox, faMagnifyingGlass, faPercent, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import s from 'styled-components'

const textCardAuthorization = [
	{
		textCard: 'Заказывайте быстрее',
		iconCode: faTruckFast,
	},
	{
		textCard: 'Отслеживайте статус заказа',
		iconCode: faBox,
	},
	{
		textCard: 'Воспользуйтесь скидками и акциями',
		iconCode: faPercent,
	},
]

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
})

export const AuthFormError = s.div`
	background-color: #ff4f4f;
	color: black;
	// color: red;
	padding: 10px 5px;
	border-radius: 10px;
	margin: 10px 0;
	text-align: center;
	font-size: 20px;
	line-height: 1;
`

const AuthorizationContainer = ({ className }) => {
	const navigate = useNavigate()
	const [serverError, setServerError] = useState(null)
	// const dispatch = useDispatch()
	// const requestServer = useServerRequest()

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

	const onSubmit = (onSubmit) => {
		console.log('submit', onSubmit)
	}

	const formError = errors?.login?.message || errors?.password?.message

	const errorMessage = formError /*||  serverError */

	return (
		<div className={className}>
			<div className='container-auth'>
				<div className='form-auth'>
					<H2>Авторизоваться</H2>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							type='text'
							{...register('login', { onChange: () => setServerError(null) })}
							placeholder='Логин'
						/>
						<Input
							type='password'
							{...register('password', { onChange: () => setServerError(null) })}
							placeholder='Пароль'
						/>
						<Button
							type='submit'
							disabled={!!formError}
							height='40px'
							solid='#5e5e5e'
						>
							Авторизоваться
						</Button>
						{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
					</form>
				</div>
			</div>
			<div className='container-reg'>
					<div className='not-account'>
						<H2>У вас нету аккаунта?</H2>
						<Button height='40px'>
							<Link to='/register'>Создать аккаунт</Link>
						</Button>
					</div>

					<div className='information'>
						<h3>Почему стоит иметь учётную запись в нашем магазине?</h3>
						<div className='info-list'>
							{textCardAuthorization.map(({ textCard, iconCode }, index) => (
								<InfoCard key={index} textCard={textCard} iconCode={iconCode} />
							))}
						</div>
					</div>
			</div>
		</div>
	)
}

export const Authorization = s(AuthorizationContainer)`
	display: flex;

	h2 {
		text-align: start;
	}

	.container-auth {
		display: flex;
		justify-content: center;
		align-items: start;
	}

	.form-auth {
		padding: 20px;
		margin: 20px;
		border: 1px solid #5e5e5e;
		border-radius: 10px;
	}

	.container-reg {
		display: flex;
		flex-direction: column;
		margin: 20px;
	}

	.not-account {
		padding-top: 20px;
		margin-bottom: 20px;
	}

	.information h3 {
		border-bottom: 1px solid #5e5e5e;
		margin-bottom: 20px;
		padding-bottom: 10px;
		font-weight: 500;
	}

	@media (max-width: 768px) {
		display: block;

		.form-auth {
			margin: 0;
	}
`

AuthorizationContainer.propTypes = {
	className: PropType.string,
}
