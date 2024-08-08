import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'
import { setSubCategories } from './set-sub-categories'

export const getSubCategories = (id) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST })

		const { error, data } = await request(`${URL.SUB_CATEGORY}/${id}`)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
			return
		}

		dispatch(setSubCategories(data.subCategories))
		dispatch({ type: ACTION_TYPE.REQUEST_SUCCESS })
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error })
		console.error('error ', error)
	}
}
