import { ACTION_TYPE } from './action-type'

export const addProducts = (payload) => {
	return {
		type: ACTION_TYPE.ADD_PRODUCTS,
		payload,
	}
}
