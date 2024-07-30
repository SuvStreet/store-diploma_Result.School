const SET_AUTH = 'set-auth'

const setAuth = (auth) => {
	localStorage.setItem(SET_AUTH, auth)
}

const getAuth = () => {
	return localStorage.getItem(SET_AUTH)
}

const removeAuthData = () => {
	localStorage.removeItem(SET_AUTH)
}

const localStorageService = {
	removeAuthData,
	getAuth,
	setAuth,
}

export default localStorageService
