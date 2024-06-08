import { ENDPOINT } from '../constants'

export const addSession = (hash, user) =>
	fetch(`${ENDPOINT.SERVER}sessions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			hash,
			user: {
				id: user.id,
				login: user.login,
				registered_at: user.registeredAt,
				role_id: user.roleId,
			},
		}),
	})
