import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import styled from 'styled-components'

const ProductRowContainer = forwardRef(({ className, product }, ref) => {
	const { id, name, catalogId, price, imageUrl } = product

	return (
		<div className={className} ref={ref}>
			<span>{id}</span>
			<img src={imageUrl} alt={name} />
			<div className='name'>{name}</div>
			{/* <div className='category'>{CATALOG_LIST[catalogId]}</div> */}
			<div className='price'>{price} ₽</div>
		</div>
	)
})

ProductRowContainer.displayName = 'ProductRow'

export const ProductRow = styled(ProductRowContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
	box-shadow: 0 5px 5px -5px #5e5e5e;
	gap: 10px;
	cursor: pointer;

	&:hover {
		border-radius: 10px;
		box-shadow: 0 0 5px 5px #5e5e5e;
	}

	& span {
		margin-left: 10px;
	}

	& img {
		flex: 1;
		width: 100px;
		max-width: 100%;
		object-fit: contain;
		border-radius: 10px;
	}

	& .name {
		flex: 2;
		font-weight: 500;
	}

	& .category {
		flex: 1;
		color: #5e5e5e;
	}

	& .price {
		flex: 1;
		font-weight: 500;
	}
`

ProductRowContainer.propTypes = {
	className: PropTypes.string.isRequired,
	product: PropTypes.shape({
		catalogId: PropTypes.number.isRequired,
		categoryId: PropTypes.number.isRequired,
		description: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		imageUrl: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
	}),
}
