import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

import { Logo, Search, ControlPanel, CategoriesProducts } from './components'
import { getCategoriesList, initializeApp } from '../../redux/actions'
import {
	selectAppIsAuth,
	selectCategoriesList,
	selectUserLogin,
} from '../../redux/selectors'

import styled from 'styled-components'

const HeaderContainer = ({ className }) => {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectAppIsAuth)
	const login = useSelector(selectUserLogin)
	const { categories } = useSelector(selectCategoriesList)
	const noIsAdmin = useMatch('/')
	const pathnameAdmin = useMatch('/admin/*')

	useEffect(() => {
		if (isAuth && !login) {
			dispatch(initializeApp(pathnameAdmin))
		}
		if (!categories.length && noIsAdmin && pathnameAdmin) {
			dispatch(getCategoriesList())
		}
	}, [dispatch, isAuth, login, pathnameAdmin, categories, noIsAdmin])

	return (
		<>
			<div className={className}>
				<div className={`header-info ${pathnameAdmin ? 'header-info--admin' : ''}`}>
					<Logo />
					<Search />
					<ControlPanel userLogin={login} />
				</div>
				{!pathnameAdmin && (
					<div className='header-menu'>
						<CategoriesProducts />
					</div>
				)}
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
	z-index: 10;
	background-color: #242424;

	& .header-info {
		display: flex;
		justify-content: space-between;
		align-items: center;

		&--admin {
			margin-bottom: 20px;
		}
	}

	& .header-menu {
		width: 100%;
	}
`

HeaderContainer.propTypes = {
	className: PropTypes.string,
}
