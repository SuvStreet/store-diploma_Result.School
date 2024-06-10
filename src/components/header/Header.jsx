import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Logo, Search, ControlPanel, CategoriesProducts } from './components'
import { getSessionHash } from '../../utils'
import { useServerRequest } from '../../hooks'
import { setUser } from '../../redux/actions'
import { selectUserLogin } from '../../redux/selectors'

import styled from 'styled-components'

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
		<>
			<div className={className}>
				<div className='header-info'>
					<Logo />
					<Search />
					<ControlPanel userLogin={login} />
				</div>
				<div className='header-menu'>
					<CategoriesProducts />
				</div>
			</div>
		</>
	)
}

export const Header = styled(HeaderContainer)`
	width: 100%;
	padding-top: 20px;
	box-shadow: 0 5px 5px -5px #5e5e5e;
	position: sticky;
	top: 0;
	background-color: #242424;

	& .header-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& .header-menu {
		width: 100%;
		padding-top: 20px;
	}
`

HeaderContainer.propTypes = {
	className: PropTypes.string,
}
