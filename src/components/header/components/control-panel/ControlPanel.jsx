import PropType from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { Icon } from '../../../icon/Icon'

import { faHeart, faUser } from '@fortawesome/free-regular-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../../../redux/selectors'

import styled from 'styled-components'

const ControlPanelContainer = ({ className, userLogin }) => {
	const navigate = useNavigate()
	const userId = useSelector(selectUserId)

	const handleClickUser = () => {
		navigate(!userLogin ? '/authorize' : `/profile/${userId}`)
	}

	return (
		<div className={className}>
			<div className='header-info__item' onClick={() => handleClickUser()}>
				<p className='user__text'>Привет, {userLogin || 'авторизоваться'}</p>
				<Icon iconCode={faUser} />
			</div>
			<div className='header-info__item' onClick={() => navigate('/catalog')}>
				<Icon iconCode={faHeart} />
			</div>
			<div className='header-info__item' onClick={() => navigate('/cart')}>
				<Icon iconCode={faCartShopping} />
			</div>
		</div>
	)
}

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;

	.user__text {
		width: 100%;
		margin-right: 10px;
		font-weight: 500;
		font-size: 14px;
		text-align: end;
	}

	.header-info__item {
		display: flex;
		align-items: center;
		padding: 0 5px;
		cursor: pointer;
	}
`

ControlPanelContainer.propTypes = {
	className: PropType.string.isRequired,
	userLogin: PropType.string,
}
