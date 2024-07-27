import PropsTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthError, selectAuthIsLoading, selectUser } from '../../redux/selectors'
import { Button, Error, H2, Loader } from '../../components'

import styled from 'styled-components'
import { transformDate } from '../../utils'
import { ROLE } from '../../constants'
import { logout } from '../../redux/actions'
import { Outlet, useMatch, useNavigate } from 'react-router-dom'

const ProfileContainer = ({ className }) => {
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const isLoading = useSelector(selectAuthIsLoading)
	const error = useSelector(selectAuthError)
	const navigate = useNavigate()
	const isEdit = !!useMatch('/profile/:id/edit')

	const handleLogout = () => {
		dispatch(logout())
	}

	const handleEdit = () => {
		navigate(`/profile/${user.id}/edit`)
	}

	if (isLoading) {
		return <Loader fontSize='150px' />
	}

	if (error) {
		return <Error titleError={error} noAccess />
	}

	if (isEdit) {
		return <Outlet />
	}

	return (
		<div className={className}>
			<div className='profile__container'>
				<div className='profile__photo'>
					<img src={user.imgUserUrl} alt='photo' />
				</div>
				<div className='profile__title-container'>
					<div className='profile__title-info'>
						<H2 className='profile__title'>О себе</H2>
						<Button className='profile__button' onClick={() => handleEdit()}>Редактировать</Button>
						<Button className='profile__button' solid='red' onClick={() => handleLogout()}>Выйти</Button>
					</div>
					<div className='profile__info'>
						<div className='profile__details'>
							<span>Имя: </span>
							{user.login}
						</div>
						<div className='profile__details'>
							<span>Роль: </span>
							{user.roleId === ROLE.ADMIN ? 'Администратор' : 'Пользователь'}
						</div>
						<div className='profile__details'>
							<span>Почта: </span>
							{user.email}
						</div>
						<div className='profile__details'>
							<span>Создание: </span>
							{transformDate(user.createdAt)}
						</div>
						<div className='profile__details'>
							<span>Обновление: </span>
							{transformDate(user.updatedAt)}
						</div>
					</div>
				</div>
			</div>
			{/* TODO: сделать отслеживание заказов и комментариев к товарам */}
			{/* <div className='profile__history'>
				<H2 className='profile__title'>История покупок</H2>
			</div> */}
		</div>
	)
}

export const Profile = styled(ProfileContainer)`
	width: 100%;

	.profile__container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		margin: 20px 0;

		.profile__photo {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 200px;
			height: 200px;
			overflow: hidden;
			border-radius: 50%;
			border: 1px solid #5e5e5e;
			box-shadow: 0 0 5px 5px #5e5e5e;
			margin: 0 20px;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.profile__title-container {
			display: flex;
			flex: 1;
			flex-direction: column;
			align-items: flex-start;

			.profile__title-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				gap: 20px;
				margin-bottom: 20px;

				.profile__title {
					width: 100%;
					text-align: start;
					margin-bottom: 0;
				}
			}

			.profile__info {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: 10px;
				font-size: 18px;

				border: 1px solid #5e5e5e;
				border-radius: 10px;
				padding: 20px;

				.profile__details span {
					font-weight: 500;
					color: #5e5e5e;
				}
			}
		}
	}

	.profile__history {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 20px;
		padding: 20px;
		border: 1px solid #5e5e5e;
		border-radius: 10px;
	}
`

ProfileContainer.propTypes = {
	className: PropsTypes.string,
}
