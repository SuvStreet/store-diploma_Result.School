import { handleRequestState } from '../../utils'
import { ACTION_TYPE } from '../actions'

const initialState = {
	subCategories: [],
	isLoading: false,
	error: null,
}

export const subCategoriesListReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.REQUEST_SUB_CATEGORIES_LIST:
		case ACTION_TYPE.REQUEST_SUB_CATEGORIES_LIST_SUCCESS:
		case ACTION_TYPE.REQUEST_SUB_CATEGORIES_LIST_ERROR:
			return handleRequestState(
				state,
				action,
				{
					request: ACTION_TYPE.REQUEST_SUB_CATEGORIES_LIST,
					success: ACTION_TYPE.REQUEST_SUB_CATEGORIES_LIST_SUCCESS,
					error: ACTION_TYPE.REQUEST_SUB_CATEGORIES_LIST_ERROR,
				},
				'subCategories',
			)

		case ACTION_TYPE.SET_SUB_CATEGORIES:
			return {
				...state,
				subCategories: [...state.subCategories, ...action.payload],
			}

		default:
			return state
	}
}
