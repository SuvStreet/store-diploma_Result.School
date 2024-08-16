import { setUser } from './set-user'
import { ACTION_TYPE } from './action-type'
import { request } from '../../utils'
import { logout } from './logout'
import { URL } from '../../constants'

export const initializeApp = () => async (dispatch) => {
	dispatch({ type: ACTION_TYPE.REQUEST })

	try {
		// Загрузка данных пользователя
		const userData = await request(URL.USER)

		if (userData.error) {
			if (
				userData.error === 'Авторизованного пользователя нет!' ||
				userData.error === 'jwt expired' ||
				userData.error === 'jwt must be provided'
			) {
				dispatch(logout())
				dispatch({
					type: ACTION_TYPE.REQUEST_ERROR,
					payload: 'Требуется авторизация!',
				})
				return
			}

			dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: userData.error })
			return
		}

		dispatch(setUser(userData.data.user))

		// Загрузка категорий товаров
		const categories = await request(URL.GET_CATEGORIES_LIST)

		if (categories.error) {
			dispatch({
				type: ACTION_TYPE.REQUEST_CATEGORIES_LIST_ERROR,
				payload: categories.error,
			})
			return
		}

		dispatch({
			type: ACTION_TYPE.REQUEST_CATEGORIES_LIST_SUCCESS,
			payload: categories.data.categories,
		})

		dispatch({ type: ACTION_TYPE.REQUEST_SUCCESS })
	} catch (error) {
		dispatch({ type: ACTION_TYPE.REQUEST_ERROR, payload: error.message })
	}
}
