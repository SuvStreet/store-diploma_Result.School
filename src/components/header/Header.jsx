import PropTypes from 'prop-types'

import s from 'styled-components'

const HeaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<div>Header</div>
		</div>
	)
}

export const Header = s(HeaderContainer)`
	height: 120px;
`

HeaderContainer.propTypes = {
	className: PropTypes.string,
}
