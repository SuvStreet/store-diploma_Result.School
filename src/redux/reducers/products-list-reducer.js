import { handleRequestState } from '../../utils'
import { ACTION_TYPE } from '../actions'

const initialState = {
	list: [],
	isLoading: false,
	error: null,
}

export const productsListReducer = (state = initialState, action) => {
	return handleRequestState(
		state,
		action,
		{
			request: ACTION_TYPE.REQUEST_PRODUCTS_LIST,
			success: ACTION_TYPE.REQUEST_PRODUCTS_LIST_SUCCESS,
			error: ACTION_TYPE.REQUEST_PRODUCTS_LIST_ERROR,
		},
		'list',
	)
}
