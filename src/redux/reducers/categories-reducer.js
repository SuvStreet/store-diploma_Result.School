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
		case ACTION_TYPE.SET_CATEGORIES:
			console.log('SET_CATEGORIES', action)
			return {
				...state,
				categories: action.payload,
			}
		default:
			return state
	}
}
