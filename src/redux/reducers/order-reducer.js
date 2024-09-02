import { handleRequestState } from '../../utils'
import { ACTION_TYPE } from '../actions'

const initialState = {
	isLoading: false,
	error: null,
	ordersUser: [],
	ordersAll: [],
}

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.REQUEST_ADD_ORDER_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
				ordersUser: [...state.ordersUser, action.payload],
			}

		case ACTION_TYPE.REQUEST_ADD_ORDER:
		case ACTION_TYPE.REQUEST_ADD_ORDER_ERROR:
			return handleRequestState(state, action, {
				request: ACTION_TYPE.REQUEST_ADD_ORDER,
				error: ACTION_TYPE.REQUEST_ADD_ORDER_ERROR,
			})

		default:
			return state
	}
}
