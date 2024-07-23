import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'
import { setUser } from './set-user'

export const authorization = (arg) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.AUTH_REQUEST })

		const { error, data } = await request(URL.AUTHORIZE, 'POST', arg)

		if (error) {
			dispatch({ type: ACTION_TYPE.AUTH_ERROR, payload: error })
			return
		}

		dispatch({ type: ACTION_TYPE.AUTH_SUCCESS })
		dispatch(setUser(data))
		
	} catch (error) {
		dispatch({ type: ACTION_TYPE.AUTH_ERROR, payload: error })
	}
}
