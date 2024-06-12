import { ENDPOINT } from '../constants'

export const getCategory = async (id) =>
	fetch(`${ENDPOINT.SERVER}category/${id}`)
		.then((loadedCategory) => loadedCategory.json())
		.then((loadedCategory) => loadedCategory)
