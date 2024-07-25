/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import PropTypes from 'prop-types'

import { Button } from '../../../../components/button/Button'
import { Feature } from '../feature/Feature'

import styled from 'styled-components'

const CardContainer = ({ className, product }) => {
	const {
		brand,
		categoryId,
		description,
		discount,
		features,
		id,
		price,
		imgUrl,
		name,
		quantity,
		rating,
	} = product

	return (
		<div className={className}>
			<div className='imgProduct'>
				<img src={imgUrl} alt='photo' />
			</div>
			<div className='infoProduct'>
				<h2 className='nameProduct'>{name}</h2>

				<div className='containerProduct'>
					<div className='fastInfoProduct'>
						<Feature features={features} />
						<div className='price__container'>
							<div className='priceProduct'>
								<div className='price__price'>
									{discount === 0 ? price : price - ((price * discount) / 100).toFixed()}{' '}
									₽
								</div>
								{discount !== 0 && <div className='price__noDiscount'>{price} ₽</div>}
							</div>
							<Button className='priceButton'>Добавить в корзину</Button>
						</div>
					</div>
				</div>

				<div className='descriptionProduct'>
					<h2 className='description__title'>О товаре</h2>
					<div className='description__text'>{description}</div>
				</div>
			</div>
		</div>
	)
}

export const Card = styled(CardContainer)`
	display: flex;
	justify-content: space-between;
	gap: 10px;

	.imgProduct {
		width: 600px;
		max-width: 100%;
		overflow: hidden;

		img {
			width: 100%;
			max-width: 100%;
			object-fit: cover;
			border-radius: 10px;
		}
	}

	.infoProduct {
		width: 100%;
	}

	.nameProduct {
		text-align: start;
		margin-bottom: 15px;
	}

	.fastInfoProduct {
		display: flex;
		justify-content: space-between;
		gap: 10px;
	}

	@media (max-width: 1200px) {
		.fastInfoProduct {
			flex-direction: column;
			gap: 0;
		}
	}

	.price__container {
		width: 100%;
	}

	.priceProduct {
		display: flex;
		justify-content: space-between;
		gap: 10px;
		margin: 10px 0;

		.price__price {
			font-size: 40px;
			font-weight: bold;
		}

		.price__noDiscount {
			font-size: 14px;
			color: #5e5e5e;
			text-decoration: line-through;
			margin-top: 10px;
		}
	}

	.containerProduct {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.featureProduct {
		width: 50%;
	}

	.description__title {
		text-align: start;
		margin-bottom: 15px;
	}

	.description__text {
		text-align: start;
	}
`

CardContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
