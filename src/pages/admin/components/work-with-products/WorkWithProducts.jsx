import PropTypes from 'prop-types'

import { ProductForm, ProductList } from './components'

import styled from 'styled-components'

const WorkWithProductsContainer = ({ className }) => {
	return (
		<div className={className}>
			<ProductForm />
			<ProductList />
		</div>
	)
}

export const WorkWithProducts = styled(WorkWithProductsContainer)`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	@media (max-width: 768px) {
		flex-direction: column;
		
	}
`

WorkWithProductsContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
