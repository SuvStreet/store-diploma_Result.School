import { ENDPOINT } from '../constants'

export const deleteSession = async (sessionId) =>
	fetch(`${ENDPOINT.SERVER}sessions/${sessionId}`, {
		method: 'DELETE',
	})
