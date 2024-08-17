import { URL } from '../../constants/url'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const getSubCategories = (id) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_SUB_CATEGORIES_LIST })

		const { error, data } = await request(`${URL.SUB_CATEGORY}/${id}`)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_SUB_CATEGORIES_LIST_ERROR, payload: error })
			return
		}

		dispatch({
			type: ACTION_TYPE.REQUEST_SUB_CATEGORIES_LIST_SUCCESS,
			payload: data.subCategories,
		})
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_SUB_CATEGORIES_LIST_ERROR, payload: error })
		console.error('error ', error)
	}
}
