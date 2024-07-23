import { getProducts } from '../api'
import { ERROR } from '../constants'
import { getLastPageFromLinks } from '../utils'

export const fetchProducts = async (id, page) => {
	const { products, links } = await getProducts(id, page)

	if (!products || products.length === 0) {
		return {
			error: ERROR.PRODUCTS_NOT_FOUND,
			res: null,
		}
	}

	const lastPage = getLastPageFromLinks(links)

	return {
		error: null,
		res: {
			products,
			lastPage,
		},
	}
}
