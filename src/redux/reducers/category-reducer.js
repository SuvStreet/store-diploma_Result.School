import { ACTION_TYPE } from '../actions'

const initialState = {
	id: null,
	name: '',
	catalog: [],
}

export const categoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATEGORY:
			return {
				...state,
				...action.payload,
			}
		default:
			return state
	}
}
