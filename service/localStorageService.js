const TOKEN_KEY = 'jwt-token'
const EXPIRES_KEY = 'jwt-expires'

export const setToken = ({ accessToken, expiresIn = '3600' }) => {
	const expiresData = expiresIn * 1000

	localStorage.setItem(TOKEN_KEY, accessToken)
	localStorage.setItem(EXPIRES_KEY, expiresData.toString())
}

const getAccessToken = () => {
	return localStorage.getItem(TOKEN_KEY)
}
const getGetTokenExpiresDate = () => {
	return localStorage.getItem(EXPIRES_KEY)
}

const removeAuthData = () => {
	localStorage.removeItem(TOKEN_KEY)
	localStorage.removeItem(EXPIRES_KEY)
}

const localStorageService = {
	getAccessToken,
	removeAuthData,
	getGetTokenExpiresDate,
	setToken,
}

export default localStorageService
