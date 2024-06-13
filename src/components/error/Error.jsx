import { faGear } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Icon } from '../icon/Icon'

const ErrorContainer = ({ className, titleError, ...props }) => {
	const { spin } = props

	return (
		<div className={className}>
			{spin && (
				<>
					<Icon
						fontSize='4rem'
						margin='0 auto 0 calc(50% - 3rem)'
						iconCode={faGear}
						cursor='default'
						spin
					/>
					<Icon
						fontSize='3rem'
						margin='-5px auto 0'
						iconCode={faGear}
						cursor='default'
						spin
						spinReverse
					/>
				</>
			)}

			<p className='error__text'>{titleError}</p>
		</div>
	)
}

export const Error = styled(ErrorContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.error__text {
		margin-top: 20px;
		text-align: center;
	}
`

ErrorContainer.propTypes = {
	className: PropTypes.string.isRequired,
	titleError: PropTypes.string.isRequired,
	spin: PropTypes.bool.isRequired,
}
