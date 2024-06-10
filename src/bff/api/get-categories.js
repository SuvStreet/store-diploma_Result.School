import { ENDPOINT } from '../constants'

export const getCategories = async () =>
	fetch(`${ENDPOINT.SERVER}categories`)
		.then((loadedCategories) => loadedCategories.json())
		.then((loadedCategories) => loadedCategories)
