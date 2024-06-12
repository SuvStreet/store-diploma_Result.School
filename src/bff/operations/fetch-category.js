import { getCategory } from '../api'
import { ERROR } from '../constants'

export const fetchCategory = async (id) => {
	const category = await getCategory(id)

	if(!category) {
		return {
			error: ERROR.CATEGORY_NOT_FOUND,
			res: null,
		}
	}

	return {
		error: null,
		res: {
			category,
		},
	}
}
