import PropTypes from 'prop-types'

import { Icon } from '../icon/Icon'

import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const LoaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<Icon iconCode={faEllipsis} beatFade cursor='inherit' />
		</div>
	)
}

export const Loader = styled(LoaderContainer)`
	margin: 0 auto;
	font-size: ${({ fontSize }) => fontSize || '32px'};
`

LoaderContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
