import { URL } from '../../constants'
import { request } from '../../utils'
import { ACTION_TYPE } from './action-type'

export const removeProduct = (product_id) => async (dispatch) => {
	try {
		const { error } = await request(
			`${URL.PRODUCTS}/${product_id}`,
			'DELETE',
		)

		if (error) {
			throw new Error(error)
		}

		dispatch({ type: ACTION_TYPE.REMOVE_PRODUCT, payload: product_id })
	} catch (error) {
		console.error('error: ', error)
	}
}
