import { ENDPOINT } from '../constants'
import { transformProduct } from '../transformers'

export const getProducts = async (id) =>
	fetch(`${ENDPOINT.SERVER}products?catalog_id=${id}`)
		.then((loadedProducts) => loadedProducts.json())
		.then((loadedProducts) => loadedProducts && loadedProducts.map(transformProduct))
