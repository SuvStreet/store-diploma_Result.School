import { setToken } from '../../../service/localStorageService'
import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'
import { setUser } from './set-user'

export const registration = (arg) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REGISTRATION_REQUEST })

		const { error, data } = await request(URL.REGISTER, 'POST', arg)

		if (error) {
			dispatch({ type: ACTION_TYPE.REGISTRATION_ERROR, payload: error })
			return
		}

		dispatch({ type: ACTION_TYPE.REGISTRATION_SUCCESS })

		setToken({
			accessToken: data.token.accessToken,
			expiresIn: data.token.expiresIn,
		})

		dispatch(setUser(data.user))

		dispatch({ type: ACTION_TYPE.AUTH_SUCCESS })
	} catch (error) {
		console.error('error ', error)
	}
}
