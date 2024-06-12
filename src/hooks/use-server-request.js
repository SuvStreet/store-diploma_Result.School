import { useCallback } from 'react'
import { getSessionHash } from '../utils'

import { server } from '../bff'

export const useServerRequest = () => {
	const session = getSessionHash()

	return useCallback(
		(operation, ...params) => {
			const request = [
				'authorize',
				'register',
				'fetchCategory',
				'fetchProducts',
			].includes(operation)
				? params
				: [session, ...params]

			return server[operation](...request)
		},
		[session],
	)
}
