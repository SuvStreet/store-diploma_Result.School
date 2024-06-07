import { ACTION_TYPE } from '../actions'

const initialState = {
	categories: [
		{
			id: null,
			name: '',
		},
	],
}

export const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATEGORY:
			return {
				...state,
				categories: action.payload,
			}
		default:
			return state
	}
}
