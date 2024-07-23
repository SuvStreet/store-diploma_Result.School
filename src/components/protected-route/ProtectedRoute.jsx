import PropType from 'prop-types'
import { Navigate } from 'react-router-dom'

import { getSessionHash } from '../../utils'

export const ProtectedRoute = ({ children, redirectTo }) => {
	const session = getSessionHash()
	return session ? <Navigate to={redirectTo} /> : children
}

ProtectedRoute.propTypes = {
	children: PropType.node.isRequired,
	redirectTo: PropType.string.isRequired,
}
