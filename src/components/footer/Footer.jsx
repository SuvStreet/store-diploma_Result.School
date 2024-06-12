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
	width: 100%;
	box-shadow: 0 -5px 5px -5px #5e5e5e;
`

FooterContainer.propTypes = {
	className: PropTypes.string,
}
