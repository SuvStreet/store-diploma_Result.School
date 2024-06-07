const initialState = {
	orders: [
		{
			id: null,
			userId: null,
			totalPrice: 0,
			createdAt: '',
			items: [
				{
					productId: null,
					quantity: 0,
				}
			],
		},
	],
}

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_ORDERS':
			return {
				...state,
				orders: action.payload,
			}
		default:
			return state
	}
}
