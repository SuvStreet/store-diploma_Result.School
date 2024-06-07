const initialState = {
	items: [
		{
			productId: null,
			quantity: 0,
		},
	],
	totalPrice: 0,
}

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_CART':
			return {
				...state,
				items: action.payload.items,
				totalPrice: action.payload.totalPrice,
			}
		default:
			return state
	}
}
