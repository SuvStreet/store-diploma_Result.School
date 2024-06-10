import { getCategories } from '../api'
import { ERROR } from '../constants'

export const fetchCategories = async () => {
	const categories = await getCategories()

	if(!categories) {
		return {
			error: ERROR.CATEGORIES_NOT_FOUND,
			res: null,
		}
	}

	return {
		error: null,
		res: {
			categories,
		},
	}
}
