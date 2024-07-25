import { ACTION_TYPE } from '../actions'

const initialState = {
	isLoading: false,
	error: null,
	id: null,
	name: '',
	imageUrl: '',
	description: '',
	categoryId: null,
	brand: '',
	discount: null,
	quantity: null,
	price: null,
	features: {},
	rating: null,
	comments: [],
}

export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.GET_PRODUCT_REQUEST:
			return {
				...state,
				isLoading: true,
			}

		case ACTION_TYPE.GET_PRODUCT_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				...action.payload,
			}

		case ACTION_TYPE.GET_PRODUCT_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			}

		// case ACTION_TYPE.SET_PRODUCTS:
		// 	return [...action.payload]

		// case ACTION_TYPE.ADD_PRODUCTS:
		// 	return [...state, ...action.payload]

		// case ACTION_TYPE.RESET_LIST_PRODUCTS:
		// 	return initialState
		default:
			return state
	}
}
