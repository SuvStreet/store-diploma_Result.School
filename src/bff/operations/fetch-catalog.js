import { getCategories } from '../api'
import { ERROR } from '../constants'

export const fetchCatalog = async () => {
	const categories = await getCategories()

	if (!categories) {
		return {
			error: ERROR.CATALOG_LIST_NOT_FOUND,
			res: null,
		}
	}

	const catalog = categories.flatMap(category => category.catalog)

	return {
		error: null,
		res: {
			catalog,
		},
	}
}
