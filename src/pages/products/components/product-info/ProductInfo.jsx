import PropTypes from 'prop-types'

import styled from 'styled-components'

const ProductInfoContainer = ({ className, name, description }) => {
	return (
		<div className={className}>
			<div className='title-product'>
				<p>{name}</p>
			</div>
			<div className='description-product'>
				<p>{description}</p>
			</div>
		</div>
	)
}

export const ProductInfo = styled(ProductInfoContainer)`
	display: flex;
	flex-direction: column;
	align-items: start;
	width: 100%;

	.title-product {
		font-weight: 500;
		font-size: 20px;
	}

	.description-product {
		font-weight: 400;
		font-size: 14px;
		color: #5e5e5e;
	}
`

ProductInfoContainer.propTypes = {
	className: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
}
