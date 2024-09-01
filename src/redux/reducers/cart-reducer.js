import localStorageService from '../../service/localStorageService'
import { ACTION_TYPE } from '../actions'

const initialState = localStorageService.getCart() || {
	items: [],
	totalPrice: 0,
}

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_TO_CART:
			return {
				...state,
				items: action.payload.items,
				totalPrice: action.payload.totalPrice,
			}

		case ACTION_TYPE.UPDATE_CART:
			return {
				...state,
				items: action.payload.items,
				totalPrice: action.payload.totalPrice,
			}

		case ACTION_TYPE.CLEAR_CART:
			return {
				...state,
				items: [],
				totalPrice: 0,
			}

		default:
			return state
	}
}
