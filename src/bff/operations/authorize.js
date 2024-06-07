import { addSession, getSession, getUserByLogin } from '../api'
import { ERROR } from '../constants'
import { sessions } from '../sessions'

export const authorize = async (sessionHash, authLogin, authPassword) => {
	if (sessionHash) {
		const sessionUser = await getSession(sessionHash)

		if (!sessionUser) {
			return {
				error: ERROR.USER_NOT_AUTHORIZED,
				res: null,
			}
		}

		return {
			error: null,
			res: sessionUser,
		}
	}

	const user = await getUserByLogin(authLogin)

	if (!user) {
		return {
			error: ERROR.USER_NOT_FOUND,
			res: null,
		}
	}

	const { id, login, password, registeredAt, roleId } = user

	if (password !== authPassword) {
		return {
			error: ERROR.USER_INCORRECT_PASSWORD,
			res: null,
		}
	}

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
