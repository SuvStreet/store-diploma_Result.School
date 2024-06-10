import PropTypes from 'prop-types'

import styled from 'styled-components'

const FooterContainer = ({ className }) => {
	return (
		<div className={className}>
			<div>Footer</div>
		</div>
	)
}

export const Footer = styled(FooterContainer)`
	height: 120px;
`

FooterContainer.propTypes = {
	className: PropTypes.string,
}
