import PropTypes from 'prop-types'

import { Button } from '../button/Button'

import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import {
	decreaseQuantity,
	increaseQuantity,
	removeItemFromCart,
} from '../../redux/actions'

const QuantitySelectorContainer = ({ className, id, quantity, quantityAll }) => {
	const dispatch = useDispatch()
	
	const handleIncrease = () => {
		dispatch(increaseQuantity(id))
	}

	const handleDecrease = () => {
		if (quantity === 1) return
		dispatch(decreaseQuantity(id))
	}

	const handleRemove = () => {
		dispatch(removeItemFromCart(id))
	}

	return (
		<div className={className}>
			<Button
				className='quantity-selector__item'
				disabled={quantity === 1}
				onClick={handleDecrease}
			>
				-
			</Button>
			<span className='quantity-selector__item'>{quantity}</span>
			<Button className='quantity-selector__item' onClick={handleIncrease}>
				+
			</Button>
			{quantityAll > 1 && (
				<Button
					className='quantity-selector__item quantity-selector__item--remove'
					solid='red'
					onClick={handleRemove}
				>
					x
				</Button>
			)}
		</div>
	)
}

export const QuantitySelector = styled(QuantitySelectorContainer)`
	display: flex;

	.quantity-selector__item {
		width: 30px;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.quantity-selector__item:nth-child(2) {
		margin: 0 5px;
	}

	.quantity-selector__item--remove {
		margin-left: 5px;
	}
`

QuantitySelectorContainer.propTypes = {
	className: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	quantity: PropTypes.number.isRequired,
	quantityAll: PropTypes.number.isRequired,
}
