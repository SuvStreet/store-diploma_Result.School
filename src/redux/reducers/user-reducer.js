const initialState = {
	id: null,
	login: '',
	registeredAt: '',
	roleId: null,
}

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_USER':
			return {
				...state,
				id: action.payload.id,
				login: action.payload.login,
				roleId: action.payload.roleId,
				registeredAt: action.payload.registeredAt,
			}
		default:
			return state
	}
}
