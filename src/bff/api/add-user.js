import { ENDPOINT } from '../constants'
import { transformUser } from '../transformers'

export const addUser = (login, password) =>
	fetch(`${ENDPOINT.SERVER}users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			login,
			password,
			registered_at: new Date().toISOString().substring(0, 16).replace('T', ' '),
			role_id: 2,
		}),
	})
		.then((createdUser) => createdUser.json())
		.then((createdUser) => createdUser && transformUser(createdUser))
