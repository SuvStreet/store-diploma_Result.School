import { ACTION_TYPE } from '../actions'

const initialState = {
	categories: [],
	subCategories: [],
}

export const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			}

		case ACTION_TYPE.SET_SUB_CATEGORIES:
			return {
				...state,
				subCategories: action.payload,
			}
		default:
			return state
	}
}
