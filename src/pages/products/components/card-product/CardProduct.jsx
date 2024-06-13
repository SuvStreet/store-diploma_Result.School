import PropTypes from 'prop-types'

import { Button, Icon } from '../../../../components'
import { ProductInfo } from '../product-info/ProductInfo'

import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'

const CardProductContainer = ({ className, imageUrl, name, price, description }) => {
	return (
		<div className={className}>
			<div className='img-container'>
				<img src={imageUrl} alt={name} />
			</div>
			<div className='info-container'>
				<ProductInfo name={name} description={description} />

				<div className='price-button'>
					<div className='price-product'>{price} ₽</div>
					<div className='button-product'>
						<Button>
							<Icon iconCode={faHeart} fontSize='20px'></Icon>
							<p>В избранное</p>
						</Button>
						<Button>
							<Icon iconCode={faCartShopping} fontSize='20px'></Icon>
							<p>В корзину</p>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export const CardProduct = styled(CardProductContainer)`
	width: 100%;
	height: 200px;
	display: flex;
	padding: 20px;
	gap: 20px;
	border-radius: 10px;
	transition: 0.3s ease;

	&:hover {
		box-shadow: 0 0 5px 5px #5e5e5e;
	}

	.img-container {
		display: flex;
		justify-content: center;
		max-width: 200px;
		width: 100%;

		img {
			border-radius: 10px;
			width: 100%;
			object-fit: cover;
		}
	}

	.info-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.price-button {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;

		.price-product {
			text-align: end;
			font-weight: 500;
			font-size: 35px;
		}

		.button-product {
			display: flex;
			justify-content: space-between;
			gap: 10px;

			p {
				display: none;
			}
		}
	}
`

CardProductContainer.propTypes = {
	className: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	description: PropTypes.string.isRequired,
}
