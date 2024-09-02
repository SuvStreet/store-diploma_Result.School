/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import { Button, Icon } from '../../../../components'
import { ProductInfo } from '../product-info/ProductInfo'
import { formatPrice } from '../../../../utils'

import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const CardProductContainer = forwardRef(({ className, product, ...props }, ref) => {
	return (
		<div className={`${className} ${product.quantity === 0 ? 'empty' : ''}`} ref={ref}>
			<div className='img-container'>
				<Link to={`/products/${product.id}`}>
					<img src={product.images[0]} alt={product.name} />
				</Link>
			</div>
			<div className='info-container'>
				<div className='info-container__content'>
					<div className='content'>
						<ProductInfo
							id={product.id}
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
							<span>
								{formatPrice(
									product.price - ((product.price * product.discount) / 100).toFixed(),
								)}{' '}
								₽
							</span>
							{product.discount > 0 && (
								<span className='old-price'>{formatPrice(product.price)}</span>
							)}
							<span className='discount'>-{product.discount}%</span>
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
	box-shadow: 0 0 5px 5px #5e5e5e;

	&.empty {
		opacity: 0.5;
		background-color: #353535;

		&:hover {
			box-shadow: none;
		}
	}

	.img-container {
		display: flex;
		justify-content: center;
		width: 160px;
		height: 160px;
		max-width: 100%;

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
			display: flex;
			gap: 10px;
			align-items: center;
			justify-content: flex-end;
			font-weight: 500;
			font-size: 35px;

			.old-price {
				text-decoration: line-through;
				font-size: 20px;
				color: #888888;
			}

			.discount {
				background-color: red;
				padding: 0 5px;
				border-radius: 10px;
				align-self: flex-start;
				font-size: 13px;
			}
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
