import { ENDPOINT } from '../constants'
import { transformSession } from '../transformers'

export const getSession = (hash) => {
	return fetch(`${ENDPOINT.SERVER}sessions?hash=${hash}`)
		.then((loadedSessions) => loadedSessions.json())
		.then((loadedSession) => loadedSession && transformSession(loadedSession))
}
