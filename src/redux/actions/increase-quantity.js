import localStorageService from '../../service/localStorageService'
import { ACTION_TYPE } from './action-type'

export const increaseQuantity = (id) => (dispatch, getState) => {
	const { cart } = getState()

	const updatedItems = cart.items.map((item) => {
		if (item.id === id) {
			const discountMultiplier = 1 - item.discount / 100
			const discountedPrice = Number((item.price * discountMultiplier).toFixed())
			const totalPrice = (item.quantity + 1) * discountedPrice

			return {
				...item,
				quantity: item.quantity + 1,
				totalPrice: totalPrice,
			}
		}
		return item
	})

	const totalOrderPrice = updatedItems.reduce((total, item) => total + item.totalPrice, 0)

	dispatch({
		type: ACTION_TYPE.UPDATE_CART,
		payload: {
			items: updatedItems,
			totalPrice: totalOrderPrice,
		},
	})

	localStorageService.setCart({
		items: updatedItems,
		totalPrice: totalOrderPrice,
	})
}
