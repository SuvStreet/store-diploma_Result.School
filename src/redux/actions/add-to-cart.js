import localStorageService from '../../service/localStorageService'
import { ACTION_TYPE } from './action-type'

export const addToCart = (id, name, price, img, discount) => (dispatch, getState) => {
	const { cart } = getState()

	const existingItem = cart.items.find((item) => item.id === id)

	if (existingItem) {
		return
	}

	const newItem = {
		id,
		name,
		price,
		img,
		discount,
		totalPrice: Number(((1 - discount / 100) * price).toFixed()),
		quantity: 1,
	}

	const updatedItems = [...cart.items, newItem]

	const totalOrderPrice = updatedItems.reduce(
		(total, item) =>
			total + ((1 - item.discount / 100) * item.price).toFixed() * item.quantity,
		0,
	)

	dispatch({
		type: ACTION_TYPE.ADD_TO_CART,
		payload: { items: updatedItems, totalPrice: totalOrderPrice },
	})

	localStorageService.setCart({ items: updatedItems, totalPrice: totalOrderPrice })
}
