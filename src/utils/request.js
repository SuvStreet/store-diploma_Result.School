import localStorageService from '../service/localStorageService'
import { URL } from '../constants/url'

export const request = (url, method = 'GET', data = null) => {
	return fetch(`${URL.API}${url}`, {
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: `Bearer ${localStorageService.getAccessToken()}`,
		},
		method,
		body: data && JSON.stringify(data),
	}).then((response) => response.json())
}
