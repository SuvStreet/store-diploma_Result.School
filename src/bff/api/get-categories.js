import { ENDPOINT } from '../constants'

export const getCategories = async () =>
	fetch(`${ENDPOINT.SERVER}category`)
		.then((loadedCategory) => loadedCategory.json())
		.then((loadedCategory) => loadedCategory)
