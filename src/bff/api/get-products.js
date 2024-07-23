import { ENDPOINT } from '../constants'
import { transformProduct } from '../transformers'

export const getProducts = async (id, page) =>
	fetch(`${ENDPOINT.SERVER}products${id ? `?catalog_id=${id}&` : '?'}_page=${page}`)
		.then((loadedProducts) =>
			Promise.all([loadedProducts.json(), loadedProducts.headers.get('Link')]),
		)
		.then(([loadedProducts, links]) => ({
			products: loadedProducts && loadedProducts.map(transformProduct),
			links,
		}))
