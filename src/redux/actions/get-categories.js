import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'
import { setCategories } from './set-categories'

export const getCategories = () => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST })

		const { error, data } = await request(`${URL.CATEGORY}`)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
			return
		}

		dispatch({ type: ACTION_TYPE.REQUEST_SUCCESS })
		dispatch(setCategories(data.categories))
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
		console.error('error ', error)
	}
}
