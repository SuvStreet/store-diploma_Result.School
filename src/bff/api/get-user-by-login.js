import { ENDPOINT } from '../constants'
import { transformUser } from '../transformers'

export const getUserByLogin = async (loginToFind) =>
	fetch(`${ENDPOINT.SERVER}users?login=${loginToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser))
