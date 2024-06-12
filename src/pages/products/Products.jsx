import PropTypes from 'prop-types'

import styled from 'styled-components'

const ProductsContainer = ({className}) => {
	return (
		<main className={className}>

		</main>
	)
}

export const Products = styled(ProductsContainer)`
	margin: 0 auto;
	.main__h2 {
		margin-bottom: 20px;
	}
`

ProductsContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
