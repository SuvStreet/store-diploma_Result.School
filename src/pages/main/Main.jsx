import PropTypes from 'prop-types'

import styled from 'styled-components'

const MainContainer = ({className}) => {
	return (
		<main className={className}>
			
		</main>
	)
}

export const Main = styled(MainContainer)`
	margin: 0 auto;
	.main__h2 {
		margin-bottom: 20px;
	}
`

MainContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
