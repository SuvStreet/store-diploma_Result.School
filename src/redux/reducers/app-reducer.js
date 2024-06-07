import { ACTION_TYPE } from '../actions'

const initialState = {
	isAuth: false,
}

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_AUTH:
			return {
				...state,
				isAuth: action.isAuth,
			}
		default:
			return state
	}
}
