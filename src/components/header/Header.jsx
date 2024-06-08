import PropTypes from 'prop-types'

import { Icon } from '../icon/Icon'

import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import s from 'styled-components'

const HeaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className='header-logo'>
				<img src='/logo.png' alt='logo' />
			</div>
			<div className='header-search'>
				<input type='text' placeholder='Поиск...' />
			</div>
			<div className='header-info'>
				<div className='header-info__item'>
					<Icon iconCode={faEllipsis} beatFade cursor='default' />
				</div>
				<div className='header-info__item'>Аккаунт</div>
				<div className='header-info__item'>Корзина</div>
			</div>
		</div>
	)
}

export const Header = s(HeaderContainer)`
	height: 120px;
`

HeaderContainer.propTypes = {
	className: PropTypes.string,
}
