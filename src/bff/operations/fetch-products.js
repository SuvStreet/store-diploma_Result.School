import { getProducts } from '../api'
import { ERROR } from '../constants'

export const fetchProducts = async (id) => {
	const products = await getProducts(id)

	if(!products || products.length === 0) {
		return {
			error: ERROR.PRODUCTS_NOT_FOUND,
			res: null,
		}
	}

	return {
		error: null,
		res: {
			products,
		},
	}
}
