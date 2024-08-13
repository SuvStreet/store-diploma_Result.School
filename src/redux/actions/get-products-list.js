import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const getProductsList = (subCategoryId) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_PRODUCTS_LIST })

		let response = null

		if (!subCategoryId) {
			response = await request(URL.GET_PRODUCTS)
		} else {
			response = await request(`${URL.GET_PRODUCTS_LIST}/${subCategoryId}`)
		}

		const { error, data } = response
		
		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_PRODUCTS_LIST_ERROR, payload: error })
			return
		}

		dispatch({ type: ACTION_TYPE.REQUEST_PRODUCTS_LIST_SUCCESS, payload: data.products })
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_PRODUCTS_LIST_ERROR, payload: error })
		console.error('error: ', error)
	}
}
