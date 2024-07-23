import { URL } from '../../constants/url'
import { request } from '../../utils'
import { setUser } from './set-user'

export const getUser = () => async (dispatch) => {
	try {
		const { error, data } = await request(URL.USER, 'GET')

		if (error) {
			console.error('error ', error)
			return
		}

		dispatch(setUser(data.user))
	} catch (error) {
		console.error('error ', error)
	}
}
