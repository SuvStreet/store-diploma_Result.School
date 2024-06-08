import { getUserByLogin, addUser, addSession } from '../api'
import { ERROR } from '../constants'
import { sessions } from '../sessions'

export const register = async (regLogin, regPassword) => {
	const existedUser = await getUserByLogin(regLogin)

	if (existedUser) {
		return {
			error: ERROR.USER_EXISTS,
			res: null,
		}
	}

	const user = await addUser(regLogin, regPassword)

	if(!user) {
		return {
			error: ERROR.USER_NOT_CREATED,
			res: null,
		}
	}
	const { id, login, roleId, registeredAt } = user

	const createSessionHash = sessions.create({ id, login, roleId })

	addSession(createSessionHash, { id, login, registeredAt, roleId })

	return {
		error: null,
		res: {
			id,
			login,
			roleId,
			registeredAt,
			sessionHash: createSessionHash,
		},
	}
}
