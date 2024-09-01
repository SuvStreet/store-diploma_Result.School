import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Button, Error, QuantitySelector } from '../../components'
import { selectCart } from '../../redux/selectors'
import { formatPrice } from '../../utils'
import { clearCart } from '../../redux/actions'

import styled from 'styled-components'

const CartContainer = ({ className }) => {
	const dispatch = useDispatch()
	const cart = useSelector(selectCart)

	if (cart.items.length === 0) {
		return (
			<div className={`${className} cart-empty`}>
				<Error titleError='Корзина пуста' cartEmpty />
			</div>
		)
	}

	const handleClearCart = () => {
		dispatch(clearCart())
	}

	return (
		<div className={className}>
			<h1>Оформление заказа</h1>
			<div className='container'>
				<div className='container-cart'>
					<div className='cart'>
						<div className='cart-header'>
							<h3>Корзина</h3>
							<Button solid='red' width='40%' onClick={() => handleClearCart()}>
								Очистить корзину
							</Button>
						</div>
						<div className='cards-products'>
							<div className='cards'>
								{cart.items.map((item) => (
									<div key={item.id} className='card'>
										<div className='card-img cell'>
											<img src={item.img} alt='photo' />
										</div>
										<Link to={`/products/${item.id}`} className='card-name cell'>
											<span>{item.name}</span>
										</Link>
										<div className='card-price cell'>
											<span>{item.price} ₽</span>
										</div>
										<QuantitySelector
											id={item.id}
											quantity={item.quantity}
											quantityAll={cart.items.length}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className='container-totalPrice'>
					<div className='sumTotal'>
						<h3>Итого:</h3>
						<span className='totalPrice'>{formatPrice(cart.totalPrice)} ₽</span>
					</div>
					<div className='order'>
						<h3>Стоимость товаров:</h3>
						<span
							className={`price ${cart.items.map(
								(item) => item.discount !== 0 && 'crossedText',
							)}`}
						>
							{formatPrice(
								cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
							)}{' '}
							₽
						</span>
					</div>
					<div className='container-discount'>
						<h3>Скидка:</h3>
						{cart.items.map((item, index) => (
							<div key={item.id} className='discount'>
								<p>Скидка на {index + 1} товар:</p>
								<span className='price'>
									-{' '}
									{formatPrice(
										((item.price * item.discount) / 100).toFixed() * item.quantity,
									)}{' '}
									₽
								</span>
							</div>
						))}
					</div>
					<Button solid='green'>Оформить заказ</Button>
				</div>
			</div>
		</div>
	)
}

export const Cart = styled(CartContainer)`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	max-width: 1200px;

	h1 {
		text-align: start;
	}

	img {
		max-width: 100%;
		object-fit: cover;
	}

	.cell {
		flex: 1;
	}

	&.cart-empty {
		margin: auto 0;
		font-weight: bold;
	}

	.container {
		display: flex;
		justify-content: space-between;
		gap: 20px;

		h3 {
			font-weight: 400;
			text-align: start;
		}
	}

	.container-cart {
		display: flex;
		flex-direction: column;
		gap: 20px;
		flex: 2;

		.cart {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 20px;
			background-color: #313131;
			border: 1px solid #5e5e5e;
			border-radius: 10px;
			padding: 20px;

			.cart-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 20px;
			}
		}

		.cards-products {
			.cards {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex-wrap: wrap;
				gap: 20px;

				.card {
					display: flex;
					justify-content: space-between;
					align-items: center;
					gap: 20px;

					.card-img {
						max-width: 50px;
						max-height: 50px;
						overflow: hidden;
						border-radius: 10px;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					button {
						max-width: 100px;
					}
				}
			}
		}
	}

	.container-totalPrice {
		display: flex;
		flex-direction: column;
		gap: 10px;
		border: 1px solid #5e5e5e;
		border-radius: 10px;
		padding: 20px;
		flex: 1;

		.sumTotal {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			border-bottom: 1px solid #5e5e5e;
		}

		.totalPrice {
			font-size: 35px;
			font-weight: bold;
		}

		.container-discount {
			h3 {
				border-bottom: 1px solid #5e5e5e;
				padding-bottom: 10px;
				margin-bottom: 10px;
			}

			.discount {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				gap: 5px;
			}
		}

		.order {
			display: flex;
			justify-content: space-between;

			h3 {
				font-size: 15px;
				font-weight: 400;
			}

			.price {
				text-align: end;
				width: 35%;
			}

			.crossedText {
				text-decoration: line-through;
			}
		}
	}
`

CartContainer.propTypes = {
	className: PropTypes.string,
}
