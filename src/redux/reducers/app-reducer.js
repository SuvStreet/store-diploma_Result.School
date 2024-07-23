import localStorageService from '../../../service/localStorageService'
import { ACTION_TYPE } from '../actions'

const initialState = localStorageService.getAccessToken()
	? { isAuth: true, isLoading: false, error: null }
	: { isAuth: false, isLoading: false, error: null }

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.AUTH_REQUEST:
			return {
				...state,
				isLoading: true,
			}

		case ACTION_TYPE.AUTH_SUCCESS:
			return {
				...state,
				isLoading: false,
				isAuth: true,
				error: null,
			}

		case ACTION_TYPE.AUTH_ERROR:
			return {
				...state,
				isLoading: false,
				isAuth: false,
				error: action.payload,
			}

		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				isAuth: false,
				isLoading: false,
				error: null,
			}
		default:
			return state
	}
}
