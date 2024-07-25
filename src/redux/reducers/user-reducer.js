import { ACTION_TYPE } from '../actions'

const initialState = {
	id: null,
	login: '',
	imgUserUrl: '',
	roleId: null,
	createdAt: '',
	updatedAt: '',
}

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			}
		default:
			return state
	}
}
