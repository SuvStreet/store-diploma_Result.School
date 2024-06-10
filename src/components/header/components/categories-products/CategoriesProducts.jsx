import PropTypes from 'prop-types'

import styled from 'styled-components'

const CategoriesProductsContainer = ({className}) => {

	return (
		<div className={className}>
			<p>Категории</p>
		</div>
	)
}

export const CategoriesProducts = styled(CategoriesProductsContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 0 20px;
	cursor: pointer;
`

CategoriesProductsContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
