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
			console.log('action.payload', action.payload)
			return [...action.payload]
		default:
			return state
	}
}
