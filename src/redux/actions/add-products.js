import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const addProducts = (product) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_ADD_PRODUCTS })

		const { error, data } = await request(URL.ADD_PRODUCTS, 'POST', product)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_ADD_PRODUCTS_ERROR, payload: error })
			return
		}

		dispatch({ type: ACTION_TYPE.REQUEST_ADD_PRODUCTS_SUCCESS, payload: data.product })
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ADD_PRODUCTS_ERROR, payload: error })
		console.error('error: ', error)
	}
}
