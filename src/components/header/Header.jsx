import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Logo, Search, ControlPanel } from './components'
import { getSessionHash } from '../../utils'
import { useServerRequest } from '../../hooks'
import { setUser } from '../../redux/actions'
import { selectUserLogin } from '../../redux/selectors'

import s from 'styled-components'

const HeaderContainer = ({ className }) => {
	const serverRequest = useServerRequest()
	const dispatch = useDispatch()
	const session = getSessionHash()
	const login = useSelector(selectUserLogin)

	useEffect(() => {
		if (session !== null) {
			serverRequest('authorize', session, null, null).then(({ res, error }) => {
				if (error) {
					return
				}

				const { id, login, registeredAt, roleId } = res
				dispatch(setUser({ id, login, registeredAt, roleId }))
			})
		}
	}, [session, serverRequest, dispatch])

	return (
		<div className={className}>
			<Logo />
			<Search />
			<ControlPanel userLogin={login} />
		</div>
	)
}

export const Header = s(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 20px 0;
`

HeaderContainer.propTypes = {
	className: PropTypes.string,
}
