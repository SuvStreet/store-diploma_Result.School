import PropTypes from 'prop-types'

import { Icon } from '../icon/Icon'

import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import s from 'styled-components'

const LoaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<Icon iconCode={faEllipsis} beatFade cursor='inherit'/>
		</div>
	)
}

export const Loader = s(LoaderContainer)`

`

LoaderContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
