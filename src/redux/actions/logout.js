import localStorageService from '../../service/localStorageService'
import { ACTION_TYPE } from './action-type'

export const logout = () => (dispatch) => {
	localStorageService.removeAuthData()
	dispatch({ type: ACTION_TYPE.LOGOUT })
	dispatch({ type: ACTION_TYPE.RESET_USER })
}
