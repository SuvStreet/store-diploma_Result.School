const initialState = {
	products: [
		{
			id: null,
			name: '',
			description: '',
			price: 0,
			categoryId: null,
			imageUrl: '',
		},
	],
}

export const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_PRODUCTS':
			return {
				...state,
				products: action.payload,
			}
		default:
			return state
	}
}
