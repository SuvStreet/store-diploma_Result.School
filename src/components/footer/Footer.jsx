import PropTypes from 'prop-types'

import s from 'styled-components'

const FooterContainer = ({ className }) => {
	return (
		<div className={className}>
			<div>Footer</div>
		</div>
	)
}

export const Footer = s(FooterContainer)`
	height: 120px;
`

FooterContainer.propTypes = {
	className: PropTypes.string,
}
