/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import { Button, Icon } from '../../../../components'
import { ProductInfo } from '../product-info/ProductInfo'
import { formatPrice } from '../../../../utils'

import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'

const CardProductContainer = forwardRef(({ className, product, ...props }, ref) => {

	return (
		<div className={className} ref={ref}>
			<div className='img-container'>
				<img src={product.images[0]} alt={product.name} />
			</div>
			<div className='info-container'>
				<div className='info-container__content'>
					<div className='content'>
						<ProductInfo
							name={product.name}
							description={props.full ? product.description : ''}
						/>

						<div className='features'>
							<ul className='features__list'>
								{product.features.slice(0, 5).map((feature) => (
									<li className='features__item' key={feature.id}>
										{`${feature.key}: `}
										{feature.value}
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className='price-button'>
						<div className='price-product'>
							{formatPrice(product.price)} ₽
						</div>
						<div className='button-product'>
							<Button onClick={() => console.log(product)}>
								<Icon iconCode={faHeart} fontSize='20px'></Icon>
								<p>В избранное</p>
							</Button>
							<Button onClick={() => console.log(product)}>
								<Icon iconCode={faCartShopping} fontSize='20px'></Icon>
								<p>В корзину</p>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
})

CardProductContainer.displayName = 'CardProduct'

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
		width: 200px;
		max-width: 100%;
		/* width: 100%; */

		img {
			border-radius: 10px;
			width: 100%;
			object-fit: cover;
		}
	}

	.info-container {
		width: 100%;

		&__content {
			height: 100%;
			display: flex;
			gap: 10px;
		}

		.content {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 10px;

			.features {
				&__list {
					text-align: start;
					font-size: 13px;
					color: #888888;
				}

				ul {
					list-style: none;
					padding: 0;
				}
			}
		}
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

// CardProductContainer.propTypes = {
// className: PropTypes.string.isRequired,
// images: PropTypes.string.isRequired,
// name: PropTypes.string.isRequired,
// price: PropTypes.number.isRequired,
// description: PropTypes.string.isRequired,
// }
