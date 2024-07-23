import { setSessionHash } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const setUser = (payload) => {
	console.log('payload :>> ', payload)

	setSessionHash(payload.token)
	return {
		type: ACTION_TYPE.SET_USER,
		payload: payload.user,
	}
}
