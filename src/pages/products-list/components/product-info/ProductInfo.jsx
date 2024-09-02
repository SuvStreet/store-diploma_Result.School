import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const ProductInfoContainer = ({ className, name, description, id }) => {
	console.log('key :>> ', id)

	return (
		<div className={className}>
			<Link to={`/products/${id}`} className='title-product'>
				<h3>{name}</h3>
			</Link>

			<div className='description-product'>
				<p>{description}</p>
			</div>
		</div>
	)
}

export const ProductInfo = styled(ProductInfoContainer)`
	display: flex;
	align-items: flex-start;
	flex-direction: column;

	.title-product {
		font-weight: 500;
		font-size: 20px;
	}

	.description-product {
		font-weight: 400;
		font-size: 14px;
		color: #5e5e5e;
	}

	a:hover {
		color: #007bff;
		transition: all 0.5s;
	}
`

ProductInfoContainer.propTypes = {
	className: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
}
