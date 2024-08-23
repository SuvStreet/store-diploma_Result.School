import { handleRequestState } from '../../utils'
import { ACTION_TYPE } from '../actions'

const initialState = {
	products: [],
	isLoading: false,
	error: null,
}

export const productsListReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.REQUEST_PRODUCTS_LIST:
		case ACTION_TYPE.REQUEST_PRODUCTS_LIST_SUCCESS:
		case ACTION_TYPE.REQUEST_PRODUCTS_LIST_ERROR:
			return handleRequestState(
				state,
				action,
				{
					request: ACTION_TYPE.REQUEST_PRODUCTS_LIST,
					success: ACTION_TYPE.REQUEST_PRODUCTS_LIST_SUCCESS,
					error: ACTION_TYPE.REQUEST_PRODUCTS_LIST_ERROR,
				},
				'products',
			)

		case ACTION_TYPE.REQUEST_ADD_PRODUCTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				products: [...state.products, action.payload],
			}

		case ACTION_TYPE.REQUEST_ADD_PRODUCTS:
		case ACTION_TYPE.REQUEST_ADD_PRODUCTS_ERROR:
			return handleRequestState(
				state,
				action,
				{
					request: ACTION_TYPE.REQUEST_ADD_PRODUCTS,
					error: ACTION_TYPE.REQUEST_ADD_PRODUCTS_ERROR,
				},
				'products',
			)

		case ACTION_TYPE.RESET_PRODUCTS_ERROR:
			return {
				...state,
				error: null,
			}

		default:
			return state
	}
}
