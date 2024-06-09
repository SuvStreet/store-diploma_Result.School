export const transformSession = (dbSession) => {
	return {
		hash: dbSession.hash,
		user: {
			id: dbSession.user.id,
			login: dbSession.user.login,
			registeredAt: dbSession.user.registered_at,
			roleId: dbSession.user.role_id,
		},
	}
}
