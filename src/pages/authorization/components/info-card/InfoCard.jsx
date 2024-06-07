import PropTypes from 'prop-types'

import { Icon } from '../../../../components'

import s from 'styled-components'

const InfoCardContainer = ({ className, textCard, iconCode }) => {

	return (
		<div className={className}>
			<div className='info-card__icon'>
				<Icon iconCode={iconCode} cursor='default' />
			</div>
			<div className='info-card__text'>
				<span>{textCard}</span>
			</div>
		</div>
	)
}

export const InfoCard = s(InfoCardContainer)`
	display: flex;
	align-items: center;
	margin-bottom: 20px;

	.info-card__icon {
		width: 40px;
		margin-right: 10px;
	}

	.info-card__icon svg {
		margin: 0 auto;
	}

	.info-card__text {

	}
`

InfoCardContainer.propTypes = {
	className: PropTypes.string.isRequired,
	textCard: PropTypes.string.isRequired,
	iconCode: PropTypes.object.isRequired,
}
