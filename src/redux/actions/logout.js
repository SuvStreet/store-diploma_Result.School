import localStorageService from '../../../service/localStorageService'
import { ACTION_TYPE } from './action-type'

export const logout = () => {
	localStorageService.removeAuthData()
	return { type: ACTION_TYPE.LOGOUT }
}
