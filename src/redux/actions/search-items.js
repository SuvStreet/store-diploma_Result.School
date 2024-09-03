import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const searchItems = (searchValue) => async (dispatch) => {
	try {
		dispatch({ type: ACTION_TYPE.REQUEST_PRODUCTS_LIST })

		const { error, data } = await request(
			`${URL.SEARCH_PRODUCTS}?search=${searchValue}&limit=10&page=1`,
		)

		if (error) {
			dispatch({ type: ACTION_TYPE.REQUEST_PRODUCTS_LIST_ERROR, payload: error })
			return false
		}

		dispatch({ type: ACTION_TYPE.REQUEST_PRODUCTS_LIST_SUCCESS, payload: data.products })
		return true
	} catch (error) {
		console.error('error ', error)
	}
}
