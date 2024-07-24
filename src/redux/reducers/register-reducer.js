import { ACTION_TYPE } from "../actions/action-type"

const initialState = {
	isLoading: false,
	error: null,
}

export const registerReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.REGISTRATION_REQUEST:
			return {
				...state,
				isLoading: true,
			}
		case ACTION_TYPE.REGISTRATION_SUCCESS:
			return {
				...state,
				isLoading: false,
			}
		case ACTION_TYPE.REGISTRATION_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
