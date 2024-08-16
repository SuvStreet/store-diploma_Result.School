import { handleRequestState } from '../../utils'
import { ACTION_TYPE } from '../actions'

const initialState = {
	categories: [],
	isLoading: false,
	error: null,
}

export const categoriesListReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.REQUEST_CATEGORIES_LIST:
		case ACTION_TYPE.REQUEST_CATEGORIES_LIST_SUCCESS:
		case ACTION_TYPE.REQUEST_CATEGORIES_LIST_ERROR:
			return handleRequestState(
				state,
				action,
				{
					request: ACTION_TYPE.REQUEST_CATEGORIES_LIST,
					success: ACTION_TYPE.REQUEST_CATEGORIES_LIST_SUCCESS,
					error: ACTION_TYPE.REQUEST_CATEGORIES_LIST_ERROR,
				},
				'categories',
			)

		case ACTION_TYPE.SET_CATEGORIES:
			return {
				...state,
				categories: [...state.categories, ...action.payload],
			}

		default:
			return state
	}
}
