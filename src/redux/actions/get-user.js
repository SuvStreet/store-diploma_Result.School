import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'
import { logout } from './logout'
import { setUser } from './set-user'

export const getUser = () => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.AUTH_REQUEST })

		const { error, data } = await request(URL.USER, 'GET')

		if (error) {
			if (error === 'Авторизованного пользователя нет!') {
				dispatch(logout())
				dispatch({ type: ACTION_TYPE.AUTH_ERROR, payload: error })
				return
			}

			dispatch({ type: ACTION_TYPE.AUTH_ERROR, payload: error })
			console.error('error', error)
			return
		}

		dispatch(setUser(data.user))
		dispatch({ type: ACTION_TYPE.AUTH_SUCCESS })
	} catch (error) {
		console.error('error ', error)
	}
}
