import { ACTION_TYPE } from '../actions'

const initialState = [
	{
		id: null,
		name: '',
		description: '',
		price: 0,
		categoryId: null,
		catalogId: null,
		imageUrl: '',
	},
]

export const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCTS:
			return [...action.payload]

		case ACTION_TYPE.ADD_PRODUCTS:
			return [...state, ...action.payload]

		case ACTION_TYPE.RESET_LIST_PRODUCTS:
			return initialState
		default:
			return state
	}
}
