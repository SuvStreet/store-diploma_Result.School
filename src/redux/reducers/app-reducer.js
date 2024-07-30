import localStorageService from '../../service/localStorageService'
import { ACTION_TYPE } from '../actions'

const initialState = {
	isLoading: false,
	error: null,
	isAuth: false || localStorageService.getAuth(),
}

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.REQUEST:
			return {
				...state,
				isLoading: true,
			}

		case ACTION_TYPE.REQUEST_SUCCESS:
			return {
				...state,
				isLoading: false,
				error: null,
			}

			case ACTION_TYPE.REQUEST_ERROR:
				return {
					...initialState,
					isLoading: false,
					error: action.payload,
				}

		case ACTION_TYPE.RESET_ERROR:
			return {
				...state,
				error: null,
			}

		case ACTION_TYPE.SET_AUTH:
			return {
				...state,
				isLoading: false,
				isAuth: true,
			}

		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				isLoading: false,
				isAuth: false,
			}

		default:
			return state
	}
}
